import React, { useEffect, useState } from "react";

const FeeFormModal = ({ fee, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [documentURL, setDocumentURL] = useState("");

  useEffect(() => {
    if (fee) {
      setName(fee.name || "");
      setAmount(fee.amount || "");
      setReason(fee.reason || "");
      setDocumentURL(fee.documentURL || "");
    }
  }, [fee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount || isNaN(amount)) {
      alert("Please fill all fields correctly.");
      return;
    }
    const feePayload = {
      name,
      amount: parseFloat(amount),
      reason,
      documentURL,
    };

    if (fee?.id) {
      feePayload.id = fee.id;
    }
    onSave(feePayload);
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{fee ? "Edit Fee" : "Add Fee"}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            {/* Modal Body */}
            <div className="modal-body">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Fee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="form-control mb-3"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Reason for update"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Document URL (optional)"
                value={documentURL}
                onChange={(e) => setDocumentURL(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={onClose}
                type="button"
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

export default FeeFormModal;
