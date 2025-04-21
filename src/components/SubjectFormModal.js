import React, { useState, useEffect } from "react";

const SubjectFormModal = ({ subject, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [papers, setPapers] = useState([{ name: "", code: "" }]);

  useEffect(() => {
    if (subject) {
      setName(subject.name || "");
      setCode(subject.code);
      setPapers(
        subject.papers?.length > 0 ? subject.papers : [{ name: "", code: "" }]
      );
    }
  }, [subject]);

  const handlePaperChange = (idx, field, value) => {
    const updated = [...papers];
    updated[idx][field] = value;
    setPapers(updated);
  };

  const addPaper = () => {
    setPapers([...papers, { name: "", code: "" }]);
  };

  const removePaper = (index) => {
    const updated = papers.filter((_, i) => i !== index);
    setPapers(updated.length > 0 ? updated : [{ name: "", code: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) {
      alert("Please fill all fields.");
      return;
    }

    const validPapers = papers.filter((p) => p.name.trim() && p.code !== "");
    if (validPapers.length === 0) {
      alert("Please add at least one valid paper.");
      return;
    }
    onSave({
      id: subject?.id,
      name,
      code,
      papers: validPapers,
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
              {/* Paper List Section */}
              <hr />
              <h6>Papers</h6>
              {papers.map((paper, index) => (
                <div className="row mb-2" key={index}>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Paper Name (e.g., Physics 1st Paper)"
                      value={paper.name}
                      onChange={(e) =>
                        handlePaperChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder={`Paper ${index + 1} Code `}
                      value={paper.code}
                      onChange={(e) =>
                        handlePaperChange(index, "code", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removePaper(index)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-success mt-2"
                onClick={addPaper}
              >
                <i className="fas fa-plus me-1"></i> Add Paper
              </button>
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
