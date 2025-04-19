import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaChartLine, FaUserCheck, FaHome } from "react-icons/fa";
import "./Sidebar.css"; // Optional: add custom styling
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Error occured: ", error.message);
    }
  };

  return (
    <div
      className="bg-dark text-white p-3 vh-100 position-fixed"
      style={{ width: "240px" }}
    >
      <h5 className="text-center mb-4">Dashboard</h5>

      <ul className="nav flex-column">
        {(role.includes("admin") || role.includes("superadmin")) && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin-dashboard"
                className="nav-link text-white"
                end
              >
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin-dashboard/students"
                className="nav-link text-white"
              >
                <FaUsers className="me-2" /> Manage Students
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin-dashboard/analysis"
                className="nav-link text-white"
              >
                <FaChartLine className="me-2" /> Analytics
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/admin-dashboard/approve-students"
                className="nav-link text-white"
              >
                <FaUserCheck className="me-2" /> Approve Students
              </NavLink>
            </li>
          </>
        )}

        {role.includes("superadmin") && (
          <>
            <li className="navitem mb-2">
              <NavLink
                to="/superadmin-dashboard/manage-classes"
                className="nav-link text-white"
              >
                <FaUserCheck className="me-2" /> Manage Classes
              </NavLink>
            </li>
            <li className="navitem mb-2">
              <NavLink
                to="/superadmin-dashboard/manage-subjects"
                className="nav-link text-white"
              >
                <i className="fa-regular fa-file-zipper me-2"></i> Manage
                Subjects
              </NavLink>
            </li>
            <li className="navitem mb-2">
              <NavLink
                to="/superadmin-dashboard/manage-fees"
                className="nav-link text-white"
              >
                <i className="fa-solid fa-money-bill-1 me-2"></i> Manage Fees
              </NavLink>
            </li>
          </>
        )}

        {role.includes("student") && (
          <>
            <li className="nav-item mb-2">
              <NavLink
                to="/student-dashboard"
                className="nav-link text-white"
                end
              >
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/student-dashboard/attendance"
                className="nav-link text-white"
              >
                <FaUsers className="me-2" /> Attendance
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/student-dashboard/result"
                className="nav-link text-white"
              >
                <FaChartLine className="me-2" /> Result
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/student-dashboard/payment"
                className="nav-link text-white"
              >
                <FaUserCheck className="me-2" /> Payment
              </NavLink>
            </li>
            <li className="nav-item mb-2">
              <NavLink
                to="/student-dashboard/apply"
                className="nav-link text-white"
              >
                <FaUserCheck className="me-2" /> Apply
              </NavLink>
            </li>
          </>
        )}
        <li className="nav-item mb-2">
          <button className="btn btn-danger mt-5" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
