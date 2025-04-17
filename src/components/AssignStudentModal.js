import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const AssignStudentModal = ({ show, onClose, onSubmit, student }) => {
  const [roll, setRoll] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const subjects = ["Math", "English", "Science", "Bangla", "ICT"];

  useEffect(() => {
    if (student) {
      setRoll("");
      setSelectedSubjects([]);
    }
  }, [student]);

  const handleSubmit = () => {
    if (roll && selectedSubjects.length > 0) {
      onSubmit({ roll, subjects: selectedSubjects });
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Roll & Subjects</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label>Roll Number</label>
          <input
            type="text"
            className="form-control"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Select Subjects</label>
          {subjects.map((sub) => (
            <div key={sub} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={sub}
                checked={selectedSubjects.includes(sub)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSubjects([...selectedSubjects, sub]);
                  } else {
                    setSelectedSubjects.filter((s) => s !== sub);
                  }
                }}
              />
              <label className="form-check-label">{sub}</label>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!roll || selectedSubjects.length === 0}
        >
          Approve & Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignStudentModal;
