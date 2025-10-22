from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date
from typing import Optional, Literal, Union

class RegisterIn(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    mobileNumber: Optional[str] = None
    nic: Optional[str] = None
    dateOfBirth: Optional[Union[str, date]] = None
    address: Optional[str] = None
    gender: Optional[Literal["male","female","other"]] = None
    role: Literal["patient","doctor","admin"] = "patient"
    password: str = Field(min_length=8)
    confirmPassword: str = Field(min_length=8)
    
    @field_validator('dateOfBirth', mode='before')
    @classmethod
    def parse_date(cls, v):
        if v is None:
            return None
        if isinstance(v, str):
            try:
                return date.fromisoformat(v)
            except ValueError:
                raise ValueError("Invalid date format. Use YYYY-MM-DD")
        return v

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
