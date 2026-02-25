import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ApplicantsPage from "./pages/ApplicantsPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import ApplicantDetailsPage from "./pages/ApplicantDetailsPage";
import InstitutionsPage from "./pages/InstitutionsPage";
import CampusesPage from "./pages/CampusesPage";
import DepartmentsPage from "./pages/DepartmentsPage";
import ProgramsPage from "./pages/ProgramsPage";
import SeatMatrixPage from "./pages/SeatMatrixPage";
import { Toaster } from "react-hot-toast";
import EditApplicantPage from "./pages/EditApplicantPage";
import CreateApplicantPage from "./pages/CreateApplicantPage";
import VerifyApplicantPage from "./pages/VerifyApplicantPage";
function App() {
  return (
    <>
  <Toaster position="top-right" />
      <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />
<Route path="/applicants" element={<ApplicantsPage />} />
{/* <Route path="/admissions" element={<AdmissionsPage />} /> */}
<Route path="admissions" element={<AdmissionsPage />} />
<Route path="/applicants/:id" element={<ApplicantDetailsPage />} />
<Route path="/institutions" element={<InstitutionsPage />} />
<Route path="/campuses" element={<CampusesPage />} />
<Route path="/departments" element={<DepartmentsPage />} />
<Route path="/programs" element={<ProgramsPage />} />
<Route path="/seat-matrix" element={<SeatMatrixPage />} />
<Route path="/applicants/create" element={<CreateApplicantPage />} />
<Route path="/applicants/:id/edit" element={<EditApplicantPage />} />
<Route
  path="/applicants/:id/verify"
  element={<VerifyApplicantPage />}
/>
 </Route>
    </Routes>
    </>

  
  );
}

export default App;