import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* SUPER ADMIN ROUTES */}
        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* END SUPER ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/analysis"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Analysis />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/approve-students"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminApprovePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard/manage-classes"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ClassManagementPage />
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
