from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.suggestion import Priority


class SuggestionCreate(BaseModel):
    subject_id: Optional[int] = None
    title: str
    content: str
    priority: Priority = Priority.medium
    tags: list[str] = []


class SuggestionUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    priority: Optional[Priority] = None
    tags: Optional[list[str]] = None


class SuggestionOut(BaseModel):
    id: int
    subject_id: Optional[int]
    subject_name: Optional[str] = None
    title: str
    content: str
    priority: Priority
    tags: list[str]
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Note Schemas ──────────────────────────────────────────
class NoteCreate(BaseModel):
    subject_id: Optional[int] = None
    title: str
    content: str


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None


class NoteOut(BaseModel):
    id: int
    subject_id: Optional[int]
    subject_name: Optional[str] = None
    title: str
    content: str
    created_at: datetime
    updated_at: Optional[datetime]

    model_config = {"from_attributes": True}


# ── Subject Schema ────────────────────────────────────────
class SubjectCreate(BaseModel):
    name: str
    icon: str = "📚"
    color: str = "#2563eb"


class SubjectOut(BaseModel):
    id: int
    name: str
    icon: str
    color: str
    pyq_count: int = 0

    model_config = {"from_attributes": True}


# ── Subscription Schema ───────────────────────────────────
class SubscriptionOut(BaseModel):
    id: int
    plan: str
    status: str
    billing_cycle: str
    start_date: datetime
    end_date: Optional[datetime]

    model_config = {"from_attributes": True}


class SubscriptionUpgradeRequest(BaseModel):
    plan: str   # "pro" | "elite"
    billing_cycle: str = "monthly"  # "monthly" | "yearly"


# ── Leaderboard Schema ────────────────────────────────────
class LeaderboardEntry(BaseModel):
    rank: int
    user_id: str
    name: str
    initials: str
    solved_count: int
    score: int
    plan: str
    is_me: bool = False


# ── Analytics Schema ──────────────────────────────────────
class TopicFrequency(BaseModel):
    topic: str
    count: int


class YearWiseStat(BaseModel):
    year: int
    count: int


class AnalyticsOut(BaseModel):
    subject: str
    topic_frequency: list[TopicFrequency]
    year_wise: list[YearWiseStat]
    total_questions: int
    most_asked_year: int


# ── Dashboard Stats ───────────────────────────────────────
class DashboardStats(BaseModel):
    total_pyqs: int
    solved_count: int
    bookmark_count: int
    leaderboard_rank: Optional[int]
    subject_progress: list[dict]
