📘 Admission Management & CRM – Backend
🚀 Overview

This is the backend system for an Admission Management & CRM platform built using:

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

The system manages:

Institution hierarchy

Seat matrix with quota validation

Applicant lifecycle

Admission allocation workflow

Fee confirmation

Dashboard reporting

🏗 Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB Atlas

ODM: Mongoose

Authentication: JWT

Password Hashing: bcryptjs

Deployment: Render

📂 Project Structure
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── institutionController.js
│ ├── campusController.js
│ ├── departmentController.js
│ ├── programController.js
│ ├── seatMatrixController.js
│ ├── applicantController.js
│ ├── admissionController.js
│ └── dashboardController.js
├── middleware/
│ ├── authMiddleware.js
│ └── roleMiddleware.js
├── models/
│ ├── User.js
│ ├── Institution.js
│ ├── Campus.js
│ ├── Department.js
│ ├── Program.js
│ ├── SeatMatrix.js
│ ├── Applicant.js
│ └── Admission.js
├── routes/
│ ├── authRoutes.js
│ ├── institutionRoutes.js
│ ├── campusRoutes.js
│ ├── departmentRoutes.js
│ ├── programRoutes.js
│ ├── seatMatrixRoutes.js
│ ├── applicantRoutes.js
│ ├── admissionRoutes.js
│ └── dashboardRoutes.js
├── server.js
├── .env
└── README.md
🔐 Authentication & Roles
User Roles

Admin

AdmissionOfficer

Management

Authentication

JWT-based authentication

Protected routes using middleware

Role-based access control

🏫 Academic Hierarchy
Institution
→ Campus
→ Department
→ Program
→ SeatMatrix

Each entity is linked using MongoDB ObjectId references.

🎟 Seat Matrix Logic

Each Program has one SeatMatrix.

Quota split (KCET / COMEDK / Management)

Total quota must match intake.

Real-time seat increment on allocation.

Prevents overbooking.

Business Rule:

quota.filled >= quota.total → allocation blocked
👤 Applicant Workflow

Applicant Status Flow:

Created → Allocated → Confirmed

Features:

Create applicant

Document verification tracking

Filter applicants by status, quota, category

🎯 Admission Workflow

Admission Process:

Allocate Seat

Update Fee Status

Confirm Admission

Generate Admission Number

Rules enforced:

Cannot allocate if quota full

Cannot confirm before fee paid

Cannot confirm twice

Admission number auto-generated

Example Admission Number:

ADM-2026-0001
📊 Dashboard APIs
Summary

Total applicants

Total admissions

Confirmed admissions

Pending admissions

Seat Availability

Program-wise seat breakdown

Quota-wise remaining seats

Total filled & remaining

🔎 API Endpoints
🔐 Auth
POST /api/auth/register
POST /api/auth/login
🏫 Institution
POST /api/institutions
GET /api/institutions
GET /api/institutions/:id
GET /api/institutions/full-structure
👤 Applicants
POST /api/applicants
GET /api/applicants
GET /api/applicants/:id
PUT /api/applicants/:id/documents

Supports filtering:

/api/applicants?status=Allocated
/api/applicants?quotaType=KCET
🎯 Admissions
POST /api/admissions/allocate
GET /api/admissions
PUT /api/admissions/:id/fee
PUT /api/admissions/:id/confirm

Supports filtering:

/api/admissions?confirmed=true
/api/admissions?feeStatus=Paid
/api/admissions?quotaType=KCET
📊 Dashboard
GET /api/dashboard/summary
GET /api/dashboard/seats
🧠 Business Rules Implemented

Quota cannot exceed intake

No allocation if quota full

Cannot allocate same applicant twice

Cannot confirm before fee paid

Admission number generated only after confirmation

Role-based access control

⚙️ Environment Variables

Create .env file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
▶️ Running Locally

Install dependencies:

npm install

Start server:

npm run dev

Server runs on:

http://localhost:5000
🚀 Deployment (Render)

Push code to GitHub

Create Web Service on Render

Add environment variables

Set start command:

npm start
📌 Author

Developed as part of Admission Management & CRM assessment.

✅ Status

Backend fully functional with:

Authentication

Hierarchical modeling

Seat matrix logic

Admission workflow

Dashboard reporting

Dynamic filtering
