import React, { useState, useEffect } from "react";

const ClassFormModal = ({ show, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", description: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {initialData ? "Edit Class" : "Add New Class"}
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
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control mb-2"
              placeholder="Enter your class name"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassFormModal;
