from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, ARRAY, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class Priority(str, enum.Enum):
    high = "high"
    medium = "medium"
    low = "low"


class Suggestion(Base):
    __tablename__ = "suggestions"

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="SET NULL"), nullable=True)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    priority = Column(SAEnum(Priority), default=Priority.medium)
    tags = Column(ARRAY(String), default=[])
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relationships
    subject = relationship("Subject", back_populates="suggestions")
    created_by_user = relationship("User", back_populates="suggestions")

    def __repr__(self):
        return f"<Suggestion {self.title[:30]}>"
