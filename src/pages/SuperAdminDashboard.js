import React from "react";
import Layout from "../components/Layout";

const SuperAdminDashboard = () => {
  return (
    <Layout role={["superadmin"]}>
      <div className="container mt-4">
        <h3>Welcome Super Admin</h3>
        <p>Only accessible by Super Admin.</p>
      </div>
    </Layout>
  );
};

export default SuperAdminDashboard;
