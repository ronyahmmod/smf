import React, { useState } from "react";

const ClassFormModal = ({ onClose, onSubmit, editinData }) => {
  const [className, setClassName] = useState(editinData?.name || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (className.trim() === "") {
      return;
    }
    onSubmit(className, editinData?.id || null);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ background: "#00000088" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {editinData ? "Edit Class" : "Add New Class"}
              </h5>
              <button
                type="button"
                className="btn btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={className}
                onChange={(e) => {
                  setClassName(e.target.value);
                }}
                className="form-control"
                placeholder="Enter your class name"
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {editinData ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClassFormModal;
