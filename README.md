🎓 Admission Management & CRM System
Full-Stack Academic Admission & Seat Allocation Platform
🚀 Overview

A production-grade Admission Management CRM System designed to manage the complete academic admission lifecycle — from institutional setup to final admission confirmation — with quota-aware seat allocation and real-time dashboard analytics.

This system demonstrates:

Multi-level academic hierarchy

Quota-based seat management

Role-based access control

Status-driven workflow enforcement

Real-time dashboard aggregation

Clean full-stack architecture

🏗 System Architecture
Institution
   ↓
Campus
   ↓
Department
   ↓
Program
   ↓
Seat Matrix

Admission Workflow:

Create Applicant
   ↓
Verify Documents
   ↓
Allocate Seat (Quota Based)
   ↓
Mark Fee Paid
   ↓
Confirm Admission
   ↓
Admission Number Generated
🧰 Tech Stack
🔹 Frontend

React.js (Vite)

React Router DOM

Axios (Centralized API Layer)

Tailwind CSS (Dark Mode Enabled)

Context API (Auth State Management)

React Hot Toast

🔹 Backend

Node.js

Express.js

MongoDB Atlas

Mongoose ODM

JWT Authentication

bcryptjs (Password Hashing)

Role-Based Authorization

Render Deployment

📁 Project Structure
📦 Root Structure
admission-crm/
│
├── frontend/
├── backend/
└── README.md
🖥 Frontend Structure
frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
🔌 API Layer (Frontend)
src/api/
├── axios.js
├── authApi.js
├── admissionApi.js
├── applicantApi.js
├── campusApi.js
├── dashboardApi.js
├── departmentApi.js
├── institutionApi.js
├── programApi.js
└── seatMatrixApi.js
Features

Centralized Axios instance

Automatic JWT token injection

Clean service abstraction

Modular API separation

🧩 Core Components
components/
├── KpiCard.jsx
├── Sidebar.jsx
├── Topbar.jsx
└── ProtectedRoute.jsx
Highlights

Collapsible Sidebar

Dark Mode Toggle

Role-based navigation rendering

Reusable KPI Dashboard cards

Route-level authentication guard

📄 Pages Implemented
🏢 Master Setup

InstitutionsPage

CampusesPage

DepartmentsPage

ProgramsPage

SeatMatrixPage

👤 Applicant Management

ApplicantsPage

CreateApplicantPage

EditApplicantPage

ApplicantDetailsPage

VerifyApplicantPage

🎯 Admission Management

AdmissionsPage

📊 Dashboard

DashboardPage

🔐 Frontend Role-Based Access
Role	Access
Admin	Full system control
Admission Officer	Applicant + Allocation
Management	Dashboard View Only
⚙️ Backend Structure
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── institutionController.js
│   ├── campusController.js
│   ├── departmentController.js
│   ├── programController.js
│   ├── seatMatrixController.js
│   ├── applicantController.js
│   ├── admissionController.js
│   └── dashboardController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Institution.js
│   ├── Campus.js
│   ├── Department.js
│   ├── Program.js
│   ├── SeatMatrix.js
│   ├── Applicant.js
│   └── Admission.js
│
├── routes/
│   ├── authRoutes.js
│   ├── institutionRoutes.js
│   ├── campusRoutes.js
│   ├── departmentRoutes.js
│   ├── programRoutes.js
│   ├── seatMatrixRoutes.js
│   ├── applicantRoutes.js
│   ├── admissionRoutes.js
│   └── dashboardRoutes.js
│
├── server.js
└── .env
🔐 Authentication & Authorization

JWT-based authentication

Token verification middleware

Role-based route protection

Password hashing with bcrypt

🧠 Core Business Logic
🎟 Seat Matrix Rules

Each Program has one Seat Matrix

Quota split:

KCET

COMEDK

Management

Total quota must equal program intake

Real-time seat increment during allocation

Prevents overbooking

if quota.filled >= quota.total → allocation blocked
👤 Applicant Lifecycle
Created → Allocated → Confirmed

Conditions enforced:

Documents must be verified before allocation

Cannot allocate if quota full

Cannot allocate twice

Cannot confirm before fee paid

Admission number generated only after confirmation

🎯 Admission Number Format
ADM-2026-0001

Auto-generated after confirmation.

📊 Dashboard Features
Summary API

Total Applicants

Total Admissions

Confirmed Admissions

Pending Admissions

Seat Breakdown API

Program-wise intake

Quota-wise filled

Remaining seats

Total filled & total remaining

🔎 API Documentation
🔐 Auth
POST /api/auth/register
POST /api/auth/login
🏫 Institution
POST /api/institutions
GET  /api/institutions
GET  /api/institutions/:id
GET  /api/institutions/full-structure
🏢 Campus
POST /api/campuses
GET  /api/campuses
🏢 Department
POST /api/departments
GET  /api/departments
📘 Program
POST /api/programs
GET  /api/programs
🎟 Seat Matrix
POST /api/seat-matrix
GET  /api/seat-matrix/:programId
👤 Applicants
POST /api/applicants
GET  /api/applicants
GET  /api/applicants/:id
PUT  /api/applicants/:id/documents

Supports filtering:

/api/applicants?status=Allocated
/api/applicants?quotaType=KCET
🎯 Admissions
POST /api/admissions/allocate
GET  /api/admissions
PUT  /api/admissions/:id/fee
PUT  /api/admissions/:id/confirm

Supports filtering:

/api/admissions?confirmed=true
/api/admissions?feeStatus=Paid
/api/admissions?quotaType=KCET
📊 Dashboard
GET /api/dashboard/summary
GET /api/dashboard/seats
🌙 UI Features

Dark Mode Support

Collapsible Sidebar

Responsive Layout

Status badges (Verified / Pending / Allocated / Confirmed)

Toast-based feedback

Grid-based KPI dashboard

Real-time seat updates

⚙️ Local Setup
Backend
cd backend
npm install
npm run dev

Create .env:

PORT=5000
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret
Frontend
cd frontend
npm install
npm run dev

Configure API base URL inside api/axios.js:

http://localhost:5000/api
🚀 Deployment

Backend deployed on Render

MongoDB Atlas for production database

Frontend can be deployed on Vercel / Netlify

💡 Architectural Highlights

Clean MVC backend structure

Modular frontend architecture

Centralized API abstraction

Role-based access control

Status-driven workflow logic

Quota validation system

Scalable folder organization

Populated relational references

Business-rule enforced admission lifecycle

🎯 Interview Value

This project demonstrates:

✔ Real-world hierarchical data modeling
✔ Quota-based allocation algorithm
✔ Status-restricted workflow transitions
✔ Secure authentication & authorization
✔ Clean full-stack separation
✔ API-driven dashboard analytics
✔ Production-grade folder structure

✅ Project Status

Fully functional end-to-end Admission CRM with:

Academic hierarchy

Seat matrix validation

Applicant lifecycle management

Fee tracking

Admission confirmation

Dashboard monitoring

Role-based access