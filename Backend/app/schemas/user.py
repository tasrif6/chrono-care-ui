from pydantic import BaseModel, EmailStr
from datetime import date
from typing import Optional, Literal

class UserOut(BaseModel):
    id: str
    first_name: str
    last_name: str
    email: EmailStr
    mobile_number: Optional[str] = None
    nic: Optional[str] = None
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    gender: Optional[Literal["male","female","other"]] = None
    role: Literal["patient","doctor","admin"]

    class Config:
        from_attributes = True
