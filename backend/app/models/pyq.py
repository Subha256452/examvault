from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Enum as SAEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class QuestionType(str, enum.Enum):
    short_answer = "Short Answer"
    long_answer = "Long Answer"
    mcq = "MCQ"
    numerical = "Numerical"


class Difficulty(str, enum.Enum):
    easy = "easy"
    medium = "medium"
    hard = "hard"


class PYQ(Base):
    __tablename__ = "pyqs"

    id = Column(Integer, primary_key=True, index=True)
    subject_id = Column(Integer, ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    year = Column(Integer, nullable=False, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=True)
    question_type = Column(SAEnum(QuestionType), default=QuestionType.short_answer)
    marks = Column(Integer, default=5)
    unit = Column(Integer, nullable=True)
    difficulty = Column(SAEnum(Difficulty), default=Difficulty.medium)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    subject = relationship("Subject", back_populates="pyqs")
    bookmarks = relationship("Bookmark", back_populates="pyq", cascade="all, delete")
    solved_by = relationship("SolvedQuestion", back_populates="pyq", cascade="all, delete")

    def __repr__(self):
        return f"<PYQ {self.subject_id} – {self.year}>"
