from sqlalchemy import Column, String, Date, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base
import uuid, enum

class Gender(str, enum.Enum):
    male="male"; female="female"; other="other"

class Role(str, enum.Enum):
    patient="patient"; doctor="doctor"; admin="admin"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name  = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    mobile_number = Column(String, nullable=True)
    nic = Column(String, nullable=True)
    date_of_birth = Column(Date, nullable=True)
    address = Column(String, nullable=True)
    gender = Column(Enum(Gender), nullable=True)
    role = Column(Enum(Role), nullable=False, default=Role.patient)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
