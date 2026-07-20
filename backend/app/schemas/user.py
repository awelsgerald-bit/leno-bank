from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from decimal import Decimal

# 1. Base Schema: Shared properties across all user schemas
class UserBase(BaseModel):
    full_name: str
    email: EmailStr

# 2. Create Schema: What the frontend sends when registering a new user
class UserCreate(UserBase):
    password: str

# 3. Response Schema: What our API sends back to the frontend
class UserResponse(UserBase):
    id: int
    account_number: str
    balance: Decimal
    is_active: bool
    created_at: datetime

    # This tells Pydantic it's allowed to read data directly from a SQLAlchemy model
    model_config = ConfigDict(from_attributes=True)