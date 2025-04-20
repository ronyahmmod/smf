import React, { useState } from "react";

const StudentTable = ({ students, onSelectStudent, selectedStudents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const currentStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCheckboxChange = (id) => {
    onSelectStudent(id);
  };

  return (
    <>
      <input
        className="form-control mb-3"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />
      {/* Table start */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Email</th>
            <th>Roll</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping Students */}
          {currentStudents.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No students found.
              </td>
            </tr>
          ) : (
            currentStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.roll}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ◀ Prev
        </button>
        <span>
          Showing {currentStudents.length} of {filteredStudents.length} students
          (Page {currentPage} of {totalPages})
        </span>
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </>
  );
};

export default StudentTable;
