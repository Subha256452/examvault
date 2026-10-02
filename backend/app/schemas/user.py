from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from uuid import UUID
from datetime import datetime
from app.models.user import UserRole, PlanType


# ── Register ──────────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v):
        if not v.strip():
            raise ValueError("Name cannot be empty")
        return v.strip()


# ── Login ─────────────────────────────────────────────────
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ── Update Profile ────────────────────────────────────────
class UserUpdate(BaseModel):
    name: Optional[str] = None


# ── Response ──────────────────────────────────────────────
class UserOut(BaseModel):
    id: UUID
    name: str
    email: EmailStr
    role: UserRole
    plan: PlanType
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Token ─────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOut


class TokenData(BaseModel):
    user_id: Optional[str] = None
