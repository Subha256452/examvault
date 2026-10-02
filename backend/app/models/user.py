import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class UserRole(str, enum.Enum):
    student = "student"
    admin = "admin"


class PlanType(str, enum.Enum):
    free = "free"
    pro = "pro"
    elite = "elite"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SAEnum(UserRole), default=UserRole.student, nullable=False)
    plan = Column(SAEnum(PlanType), default=PlanType.free, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    bookmarks = relationship("Bookmark", back_populates="user", cascade="all, delete")
    notes = relationship("Note", back_populates="user", cascade="all, delete")
    solved_questions = relationship("SolvedQuestion", back_populates="user", cascade="all, delete")
    subscription = relationship("Subscription", back_populates="user", uselist=False, cascade="all, delete")
    suggestions = relationship("Suggestion", back_populates="created_by_user")

    def __repr__(self):
        return f"<User {self.email}>"
