import React from "react";
import Layout from "../../components/Layout";

const Analysis = () => {
  return (
    <Layout role={["admin", "superadmin"]}>
      <h4>Analysis dashboard</h4>
      <p>Graps and stats will be here.</p>
    </Layout>
  );
};

export default Analysis;
