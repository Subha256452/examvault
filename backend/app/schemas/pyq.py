from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.pyq import QuestionType, Difficulty


# ── Create / Update ───────────────────────────────────────
class PYQCreate(BaseModel):
    subject_id: int
    year: int
    question: str
    answer: Optional[str] = None
    question_type: QuestionType = QuestionType.short_answer
    marks: int = 5
    unit: Optional[int] = None
    difficulty: Difficulty = Difficulty.medium


class PYQUpdate(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    question_type: Optional[QuestionType] = None
    marks: Optional[int] = None
    unit: Optional[int] = None
    difficulty: Optional[Difficulty] = None


# ── Response ──────────────────────────────────────────────
class SubjectMini(BaseModel):
    id: int
    name: str
    icon: str
    color: str
    model_config = {"from_attributes": True}


class PYQOut(BaseModel):
    id: int
    subject_id: int
    subject: SubjectMini
    year: int
    question: str
    answer: Optional[str] = None
    question_type: QuestionType
    marks: int
    unit: Optional[int]
    difficulty: Difficulty
    created_at: datetime
    is_bookmarked: bool = False
    is_solved: bool = False

    model_config = {"from_attributes": True}


class PYQList(BaseModel):
    total: int
    items: list[PYQOut]
