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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/students"
          element={
            <ProtectedRoute allowedRole="admin">
              <ManageStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/analysis"
          element={
            <ProtectedRoute allowedRole="admin">
              <Analysis />
            </ProtectedRoute>
          }
        />

        {/* Student Routs */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/attendance"
          element={
            <ProtectedRoute allowedRole="student">
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/result"
          element={
            <ProtectedRoute allowedRole="student">
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard/payment"
          element={
            <ProtectedRoute allowedRole="student">
              <Payment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
