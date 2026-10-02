from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.database import Base


class SubscriptionStatus(str, enum.Enum):
    active = "active"
    expired = "expired"
    cancelled = "cancelled"
    pending = "pending"


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    plan = Column(String(20), nullable=False, default="free")
    status = Column(SAEnum(SubscriptionStatus), default=SubscriptionStatus.active)
    billing_cycle = Column(String(10), default="monthly")   # monthly | yearly
    start_date = Column(DateTime(timezone=True), server_default=func.now())
    end_date = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="subscription")

    def __repr__(self):
        return f"<Subscription user={self.user_id} plan={self.plan}>"
