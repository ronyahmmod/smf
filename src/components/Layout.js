import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase-config";

const Layout = ({ role, children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("userRole");
    navigate("/");
  };

  const menuItems =
    role === "admin"
      ? [
          { name: "Dashboard", path: "/admin-dashboard" },
          { name: "Manage Students", path: "/admin-dashboard/students" },
          { name: "Analysis", path: "/admin-dashboard/analysis" },
        ]
      : [
          { name: "Dashboard", path: "/student-dashboard" },
          { name: "Attendance", path: "/student-dashboard/attendance" },
          { name: "Result", path: "/student-dashboard/result" },
          { name: "Payment", path: "/student-dashboard/payment" },
        ];

  return (
    <div className="d-flex">
      <div
        className="bg-dark text-white p-3"
        style={{ width: "220px", minHeight: "100vh" }}
      >
        <h4>{role === "admin" ? "Admin Panel" : "Student Panel"}</h4>
        <ul className="nav flex-column">
          {menuItems.forEach((item, idx) => (
            <li className="nav-item" key={idx}>
              <Link to={item.path} className="nav-link text-white">
                {item.name}
              </Link>
            </li>
          ))}
          <li className="nav-item mt-3">
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-grow-1 p-4">
        <div className="mb-4 border-bottom pb-2">
          <h5>{role.charAt(0).toUpperCase() + role.slice(1)} Dashboard</h5>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
