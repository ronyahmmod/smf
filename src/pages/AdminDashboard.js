import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout role="admin">
      <div className="container mt-4">
        <h3 className="mb-4">Admin Dashboard</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <Link
              to="/admin-dashboard/students"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fas fa-users fa-3x mb-3 text-primary"></i>
                  <h5>Manage Students</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              to="/admin-dashboard/analysis"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fas fa-chart-line fa-3x mb-3 text-success"></i>
                  <h5>Analytics</h5>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              to="/admin-dashboard/approve-students"
              className="text-decoration-none"
            >
              <div className="card bg-light shadow-sm h-100">
                <div className="card-body text-center">
                  <i className="fa-solid fa-circle-check fa-3x mb-3 text-primary"></i>
                  <h5>Approve Students</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
