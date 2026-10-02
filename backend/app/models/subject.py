from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    icon = Column(String(10), default="📚")
    color = Column(String(20), default="#2563eb")

    # Relationships
    pyqs = relationship("PYQ", back_populates="subject")
    suggestions = relationship("Suggestion", back_populates="subject")
    notes = relationship("Note", back_populates="subject")

    def __repr__(self):
        return f"<Subject {self.name}>"
