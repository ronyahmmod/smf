import React, { useState, useEffect } from "react";

const FeeCategoryFormModal = ({ category, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("annual"); // By default it set annual fee

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setAmount(category.amount || "");
      setType(category.type || "");
    }
  }, [category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount || isNaN(amount)) {
      alert("Please enter a valid title and numeric amount.");
      return;
    }

    const payLoad = {
      name: name.trim(),
      amount: parseFloat(amount),
      type,
    };

    if (category?.id) {
      payLoad.id = category.id;
    }
    onSave(payLoad);
  };
  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {category ? "Edit Fee Category" : "Add Fee Category"}
                {/* If category is defined then adit mode || new mode*/}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Fee Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g., Library Fee"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Amount (BDT)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="e.g., 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="annual">Annual</option>
                  <option value="one-time">One-Time</option>
                  <option value="service">Service-Based</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeeCategoryFormModal;
