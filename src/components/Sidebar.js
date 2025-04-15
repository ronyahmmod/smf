import React from "react";
import { NavLink } from "react-router-dom";
import { FaUsers, FaChartLine, FaUserCheck, FaHome } from "react-icons/fa";
import "./Sidebar.css"; // Optional: add custom styling

const Sidebar = ({ role }) => {
  return (
    <div
      className="bg-dark text-white p-3 vh-100 position-fixed"
      style={{ width: "220px" }}
    >
      <h5 className="text-center mb-4">Dashboard</h5>
      <ul className="nav flex-column">
        {role === "admin" && (
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
      </ul>
    </div>
  );
};

export default Sidebar;
