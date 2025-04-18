import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import Analysis from "./pages/admin/Analysis";
import Attendance from "./pages/student/Attendance";
import Result from "./pages/student/Result";
import Payment from "./pages/student/Payment";
import ProtectedRoute from "./Routes/ProtectedRoute";
import SignupPage from "./pages/SignupPage";
import StudentApplyPage from "./pages/student/StudentApplyPage";
import AdminApprovePage from "./pages/admin/AdminApprovePage";
import ClassManagementPage from "./pages/admin/ClassManagementPage";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UnAuthorizePage from "./pages/UnAuthorizePage";
import SubjectManagementPage from "./pages/admin/SubjectManagementPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<UnAuthorizePage />} />

        {/* SUPER ADMIN ROUTES */}
        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin-dashboard/manage-classes"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <ClassManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin-dashboard/manage-subjects"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SubjectManagementPage />
            </ProtectedRoute>
          }
        />
        {/* END SUPER ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard/students"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/analysis"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/approve-students"
          element={
            <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
              <AdminApprovePage />
            </ProtectedRoute>
          }
        />

        {/* Student Routs */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/attendance"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/result"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/payment"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/apply"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentApplyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
