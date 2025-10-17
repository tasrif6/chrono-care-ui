from pydantic import BaseModel, EmailStr, Field
from datetime import date
from typing import Optional, Literal

class RegisterIn(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    mobileNumber: Optional[str] = None
    nic: Optional[str] = None
    dateOfBirth: Optional[date] = None
    address: Optional[str] = None
    gender: Optional[Literal["male","female","other"]] = None
    role: Literal["patient","doctor","admin"] = "patient"
    password: str = Field(min_length=8)
    confirmPassword: str = Field(min_length=8)

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
