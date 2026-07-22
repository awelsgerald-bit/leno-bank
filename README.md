# 🏦 Leno Bank

A modern full-stack digital banking application built with **FastAPI** and **React**. Leno Bank provides a secure and intuitive banking experience, allowing users to manage accounts, transfer funds, track transactions, and monitor their financial activity through a clean, responsive interface.

---

## 🚀 Features

### 🔐 Authentication & Security

* Secure user registration and login
* JWT-based authentication
* Password hashing for secure credential storage
* Protected API endpoints
* Token-based session management

### 💳 Banking Operations

* View account balance
* Send money between accounts
* Transaction history
* Real-time balance updates after transfers
* Dashboard with account overview

### 📊 Dashboard

* Account summary
* Current balance display
* Recent transaction history
* Quick navigation to banking features

### 📜 Transaction History

* View incoming and outgoing transactions
* Track transfer amounts
* Monitor account activity

### 🎨 Modern User Interface

* Responsive design
* Clean banking dashboard
* Mobile-friendly layout
* Smooth navigation with React Router

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL (or SQLite for development)
* JWT Authentication
* Pydantic
* Uvicorn

---

# 📁 Project Structure

```text
leno-bank/
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── ...
│
└── README.md
```

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/awelsgerald-bit/leno-bank.git
cd leno-bank
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger Documentation:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🌐 Deployment

The application is designed for cloud deployment.

Typical deployment setup:

* Frontend: Vercel
* Backend: Render
* Database: PostgreSQL

---

# 📌 API Highlights

* User Authentication
* User Registration
* Login
* Account Information
* Balance Retrieval
* Fund Transfers
* Transaction History

Interactive API documentation is available through FastAPI Swagger UI.

---

# 🔒 Security

* JWT Authentication
* Password Hashing
* Protected Routes
* Request Validation
* Secure API Design

---

# 📈 Future Improvements

* Email verification
* Password reset
* Two-Factor Authentication (2FA)
* Savings accounts
* Bill payments
* Card management
* Mobile banking app
* Admin dashboard
* Notifications
* Analytics & spending insights

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Gerald Awels**

GitHub: https://github.com/awelsgerald-bit

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub. It helps others discover the project and motivates continued development.
