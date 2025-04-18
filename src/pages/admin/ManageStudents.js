import React from "react";
import Layout from "../../components/Layout";

const ManageStudents = () => {
  return (
    <Layout role={["admin", "superadmin"]}>
      <h4>ManageStudents</h4>
      <p>This is the student management page.</p>
    </Layout>
  );
};

export default ManageStudents;
