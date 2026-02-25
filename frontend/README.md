🎨 Admission Management CRM – Frontend

Frontend application for the Admission Management CRM System.
Built using React with modular architecture, role-based routing, and API abstraction.

This UI supports:

Master setup

Applicant lifecycle

Seat allocation workflow

Fee confirmation

Dashboard monitoring

Role-based access control

🚀 Tech Stack

React.js (Vite)

React Router DOM

Axios

Tailwind CSS

React Hot Toast

Context API (Auth State Management)

📁 Project Structure
frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── App.css
│
├── package.json
└── .gitignore
🔌 API Layer (/api)

All backend communication is abstracted here for clean separation of concerns.

api/
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
🔹 axios.js

Configured Axios instance

Base URL configuration

JWT token attachment via interceptor

🔹 API Modules

Each file handles specific domain logic:

Applicant CRUD

Admission allocation

Seat matrix operations

Dashboard analytics

Master setup APIs

This ensures:

Clean code

Reusable service functions

Scalable API management

🧩 Components (/components)

Reusable UI components:

components/
├── KpiCard.jsx
├── ProtectedRoute.jsx
├── Sidebar.jsx
└── Topbar.jsx
🔹 KpiCard

Used in dashboard for displaying:

Total applicants

Confirmed admissions

Seat usage metrics

🔹 ProtectedRoute

Handles role-based route protection

Redirects unauthenticated users to login

Restricts access by role (Admin / Admission Officer / Management)

🔹 Sidebar & Topbar

Layout navigation

Role-aware menu rendering

🔐 Authentication (/context & /utils)
context/
└── AuthContext.jsx

utils/
└── auth.js
AuthContext.jsx

Stores authenticated user state

Handles login/logout

Persists JWT in localStorage

Provides role-based access control

auth.js

Utility functions for:

Token handling

Role validation

Session checks

📄 Pages (/pages)

Main feature screens:

pages/
├── LoginPage.jsx
├── DashboardPage.jsx
├── InstitutionsPage.jsx
├── CampusesPage.jsx
├── DepartmentsPage.jsx
├── ProgramsPage.jsx
├── SeatMatrixPage.jsx
├── ApplicantsPage.jsx
├── CreateApplicantPage.jsx
├── EditApplicantPage.jsx
├── ApplicantDetailsPage.jsx
├── VerifyApplicantPage.jsx
└── AdmissionsPage.jsx
🏢 Master Setup Pages

InstitutionsPage

CampusesPage

DepartmentsPage

ProgramsPage

SeatMatrixPage

Admin-only access.

Supports:

Creating academic hierarchy

Configuring intake

Quota validation

Real-time seat counters

👤 Applicant Management

ApplicantsPage

CreateApplicantPage

EditApplicantPage

ApplicantDetailsPage

VerifyApplicantPage

Features:

Applicant creation (≤15 fields)

Document status tracking

Search & filter

Category & quota selection

🪑 Admission & Allocation

AdmissionsPage

Handles:

Government quota allocation

Management allocation

Seat availability checks

Fee status updates

Admission confirmation

Prevents:

Quota overflow

Seat overbooking

📊 Dashboard

DashboardPage

Displays:

Total intake vs admitted

Quota-wise seat filling

Remaining seats

Pending documents

Fee pending list

Uses:

KPI Cards

Real-time API aggregation

🔄 Routing Architecture

Defined in App.jsx using React Router.

Public Route:

/login

Protected Routes:

/dashboard

/institutions

/campuses

/departments

/programs

/seat-matrix

/applicants

/admissions

ProtectedRoute ensures:

Authentication check

Role-based permission control

🎨 UI & Styling

Tailwind CSS utility-first styling

Responsive layout

Clean admin dashboard design

Toast notifications for:

Success

Errors

Validation alerts

🔐 Role-Based Access (Frontend Level)
Role	Access
Admin	Full access
Admission Officer	Applicant + Allocation + Verification
Management	Dashboard view only

UI dynamically renders navigation options based on role.

⚙️ Installation & Setup
1️⃣ Install Dependencies
npm install
2️⃣ Configure API Base URL

Inside api/axios.js:

baseURL: "http://localhost:5000/api"
3️⃣ Run Development Server
npm run dev

Application runs at:

http://localhost:5173
🧠 Architectural Highlights

Modular API abstraction

Centralized Axios configuration

Role-based route protection

Context-based auth state management

Scalable folder structure

Clean separation of UI and business logic

Real-time seat status rendering

🎯 Assessment Alignment

This frontend implements:

Master configuration UI

Applicant workflow screens

Quota-aware seat allocation

Fee confirmation enforcement

Admission number display

Dashboard monitoring

Role-based access control

Fully aligned with minimal Admission CRM assessment requirements.