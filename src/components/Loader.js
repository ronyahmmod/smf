import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
