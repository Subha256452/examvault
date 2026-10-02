from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
from app.database import get_db
from app.models.pyq import PYQ
from app.models.bookmark import Bookmark, SolvedQuestion
from app.models.user import User
from app.schemas.pyq import PYQCreate, PYQUpdate, PYQOut, PYQList
from app.dependencies import get_current_user, get_current_admin

router = APIRouter(prefix="/pyqs", tags=["PYQs"])


def _enrich(pyq: PYQ, user: User, db: Session) -> dict:
    """Add is_bookmarked and is_solved flags to a PYQ."""
    is_bookmarked = db.query(Bookmark).filter_by(user_id=user.id, pyq_id=pyq.id).first() is not None
    is_solved = db.query(SolvedQuestion).filter_by(user_id=user.id, pyq_id=pyq.id).first() is not None
    data = PYQOut.model_validate(pyq).model_dump()
    data["is_bookmarked"] = is_bookmarked
    data["is_solved"] = is_solved
    return data


@router.get("", response_model=PYQList)
def list_pyqs(
    subject_id: Optional[int] = Query(None),
    year: Optional[int] = Query(None),
    question_type: Optional[str] = Query(None),
    marks: Optional[int] = Query(None),
    difficulty: Optional[str] = Query(None),
    unit: Optional[int] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(20, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List PYQs with optional filters. Supports pagination."""
    query = db.query(PYQ)
    if subject_id:
        query = query.filter(PYQ.subject_id == subject_id)
    if year:
        query = query.filter(PYQ.year == year)
    if question_type:
        query = query.filter(PYQ.question_type == question_type)
    if marks:
        query = query.filter(PYQ.marks == marks)
    if difficulty:
        query = query.filter(PYQ.difficulty == difficulty)
    if unit:
        query = query.filter(PYQ.unit == unit)

    total = query.count()
    pyqs = query.order_by(PYQ.year.desc()).offset(skip).limit(limit).all()
    items = [_enrich(p, current_user, db) for p in pyqs]
    return {"total": total, "items": items}


@router.get("/search", response_model=PYQList)
def search_pyqs(
    q: str = Query(..., min_length=2),
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Full-text search across question text."""
    query = db.query(PYQ).filter(PYQ.question.ilike(f"%{q}%"))
    total = query.count()
    pyqs = query.offset(skip).limit(limit).all()
    items = [_enrich(p, current_user, db) for p in pyqs]
    return {"total": total, "items": items}


@router.get("/{pyq_id}", response_model=PYQOut)
def get_pyq(
    pyq_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get a single PYQ with answer."""
    pyq = db.query(PYQ).filter(PYQ.id == pyq_id).first()
    if not pyq:
        raise HTTPException(status_code=404, detail="Question not found")
    return _enrich(pyq, current_user, db)


@router.post("", response_model=PYQOut, status_code=201)
def create_pyq(
    payload: PYQCreate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    """Admin only: Upload a new PYQ."""
    pyq = PYQ(**payload.model_dump())
    db.add(pyq)
    db.commit()
    db.refresh(pyq)
    return _enrich(pyq, admin, db)


@router.put("/{pyq_id}", response_model=PYQOut)
def update_pyq(
    pyq_id: int,
    payload: PYQUpdate,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin),
):
    """Admin only: Edit a PYQ."""
    pyq = db.query(PYQ).filter(PYQ.id == pyq_id).first()
    if not pyq:
        raise HTTPException(status_code=404, detail="Question not found")
    for field, val in payload.model_dump(exclude_none=True).items():
        setattr(pyq, field, val)
    db.commit()
    db.refresh(pyq)
    return _enrich(pyq, admin, db)


@router.delete("/{pyq_id}", status_code=204)
def delete_pyq(
    pyq_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_admin),
):
    """Admin only: Delete a PYQ."""
    pyq = db.query(PYQ).filter(PYQ.id == pyq_id).first()
    if not pyq:
        raise HTTPException(status_code=404, detail="Question not found")
    db.delete(pyq)
    db.commit()


@router.post("/{pyq_id}/solve", status_code=200)
def mark_solved(
    pyq_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Mark a question as solved. Idempotent – safe to call multiple times."""
    pyq = db.query(PYQ).filter(PYQ.id == pyq_id).first()
    if not pyq:
        raise HTTPException(status_code=404, detail="Question not found")
    existing = db.query(SolvedQuestion).filter_by(user_id=current_user.id, pyq_id=pyq_id).first()
    if not existing:
        db.add(SolvedQuestion(user_id=current_user.id, pyq_id=pyq_id))
        db.commit()
    return {"message": "Marked as solved"}
