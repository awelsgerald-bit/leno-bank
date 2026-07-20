from pydantic import BaseModel, ConfigDict
from datetime import datetime
from decimal import Decimal
from typing import Optional

class TransactionBase(BaseModel):
    amount: Decimal
    description: Optional[str] = None

class TransactionCreate(TransactionBase):
    receiver_account: str

class TransactionResponse(TransactionBase):
    id: int
    sender_id: int
    receiver_id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)