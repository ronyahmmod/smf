import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <Layout role="student">
      <div className="container mt-4">
        <h3 className="mb-4">Student Dashboard</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <Link
              to="/student-dashboard/attendance"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fas fa-calendar-check fa-3x mb-3 text-info"></i>
                  <h5>Attendance</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/student-dashboard/result"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fas fa-file-alt fa-3x mb-3 text-warning"></i>
                  <h5>Results</h5>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4">
            <Link
              to="/student-dashboard/payment"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fas fa-credit-card fa-3x mb-3 text-danger"></i>
                  <h5>Payments</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              to="/student-dashboard/apply"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fa-solid fa-file fa-3x mb-3 text-success"></i>
                  <h5>Register</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
