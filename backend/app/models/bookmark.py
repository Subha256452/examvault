from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Bookmark(Base):
    __tablename__ = "bookmarks"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    pyq_id = Column(Integer, ForeignKey("pyqs.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "pyq_id", name="unique_user_pyq_bookmark"),
    )

    # Relationships
    user = relationship("User", back_populates="bookmarks")
    pyq = relationship("PYQ", back_populates="bookmarks")


class SolvedQuestion(Base):
    __tablename__ = "solved_questions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    pyq_id = Column(Integer, ForeignKey("pyqs.id", ondelete="CASCADE"), nullable=False)
    solved_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint("user_id", "pyq_id", name="unique_user_pyq_solved"),
    )

    # Relationships
    user = relationship("User", back_populates="solved_questions")
    pyq = relationship("PYQ", back_populates="solved_by")
