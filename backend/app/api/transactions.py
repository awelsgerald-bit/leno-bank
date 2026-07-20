from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreate, TransactionResponse
from app.core.security import get_current_user
from typing import List

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/transfer", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def transfer_funds(tx_in: TransactionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if tx_in.amount <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transfer amount must be greater than zero."
        )
    
    if current_user.balance < tx_in.amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Insufficient funds."
        )
    
    receiver = db.query(User).filter(User.account_number == tx_in.receiver_account).first()
    if not receiver:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Receiver account number not found."
        )
    
    if receiver.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot transfer money to your own account."
        )
    
    current_user.balance -= tx_in.amount
    receiver.balance += tx_in.amount
    
    new_transaction = Transaction(
        sender_id=current_user.id,
        receiver_id=receiver.id,
        amount=tx_in.amount,
        description=tx_in.description
    )
    
    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    return new_transaction

@router.get("/history", response_model=List[TransactionResponse])
def get_transaction_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    history = db.query(Transaction).filter(
        (Transaction.sender_id == current_user.id) | (Transaction.receiver_id == current_user.id)
    ).order_by(Transaction.created_at.desc()).all()
    return history