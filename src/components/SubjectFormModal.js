import React, { useState, useEffect } from "react";

const SubjectFormModal = ({ subject, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (subject) {
      setName(subject.name || "");
      setCode(subject.code);
    }
  }, [subject]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      alert("Please fill all fields.");
      return;
    }
    onSave({
      id: subject?.id,
      name,
      code,
    });
  };

  return (
    <div className="modal d-block bg-dark bg-opacity-50">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {subject ? "Edit Subject" : "Add Subject"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            {/* Modal Body  */}
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Subject Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Physics"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g., PHY101"
                />
              </div>
            </div>
            {/* End Modal Body */}
            <div className="modal-footer">
              {/* Modal Footer start */}
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
            {/*Modal footer End */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectFormModal;
