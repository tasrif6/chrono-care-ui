from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.db.database import get_db
from app.db import models
from app.schemas.auth import RegisterIn, LoginIn, TokenOut
from app.schemas.user import UserOut
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(tags=["auth"])

# @router.post("/register", response_model=UserOut, status_code=201)
# def register(payload: RegisterIn, db: Session = Depends(get_db)):
#     if payload.password != payload.confirmPassword:
#         raise HTTPException(status_code=400, detail="Passwords do not match")

#     exists = db.query(models.User).filter(models.User.email == payload.email).first()
#     if exists:
#         raise HTTPException(status_code=409, detail="Email already registered")

#     user = models.User(
#         first_name=payload.firstName,
#         last_name=payload.lastName,
#         email=payload.email,
#         mobile_number=payload.mobileNumber,
#         nic=payload.nic,
#         date_of_birth=payload.dateOfBirth,
#         address=payload.address,
#         gender=payload.gender,
#         role=payload.role,
#         password_hash=hash_password(payload.password),
#     )
#     db.add(user); db.commit(); db.refresh(user)
#     return user

@router.post("/register")
def register_user(payload: RegisterIn, db: Session = Depends(get_db)):
    # Validate password confirmation
    if payload.password != payload.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # check if user already exists
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        # hash password
        hashed = hash_password(payload.password)

        # Handle gender enum conversion
        gender_enum = None
        if payload.gender:
            gender_enum = models.Gender(payload.gender.lower())
        
        # Handle role enum conversion
        role_enum = models.Role(payload.role.lower())

        user = models.User(
            first_name=payload.firstName,
            last_name=payload.lastName,
            email=payload.email,
            mobile_number=payload.mobileNumber,
            nic=payload.nic,
            date_of_birth=payload.dateOfBirth,
            address=payload.address,
            gender=gender_enum,
            role=role_enum,
            password_hash=hashed,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return {"message": "User registered successfully", "id": str(user.id)}
    
    except IntegrityError as e:
        db.rollback()
        # Check if it's a unique constraint violation on email
        if "ix_users_email" in str(e) or "email" in str(e).lower():
            raise HTTPException(status_code=400, detail="Email already registered")
        # Check if it's a unique constraint violation on NIC
        elif "nic" in str(e).lower():
            raise HTTPException(status_code=400, detail="NIC number already registered")
        else:
            raise HTTPException(status_code=400, detail="Registration failed due to data conflict")
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Internal server error during registration")


@router.post("/login", response_model=TokenOut)
def login(payload: LoginIn, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(str(user.id), user.role.value)
    return {"access_token": token}
