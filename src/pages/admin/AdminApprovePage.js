import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Layout from "../../components/Layout";
import Spinner from "react-bootstrap/Spinner";
import AssignStudentModal from "../../components/AssignStudentModal";

const AdminApprovePage = () => {
  const [requests, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rejectionInputs, setRejectionInputs] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const PAGE_SIZE = 5;

  const handleApproveClick = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "pendingStudents"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequest(data.reverse());
    } catch (error) {
      alert("Error occured: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleFinalApprove = async ({ roll, subjects }) => {
    try {
      await addDoc(collection(db, "students"), {
        ...selectedStudent,
        roll,
        subjects,
        status: "approved",
        createdAt: new Date(),
        approvedBy: "admin@example.com", // {later set real admin UID or email}
      });
      await deleteDoc(doc(db, "pendingStudents", selectedStudent.id));
      alert(`Approved ${selectedStudent.name}`);
      setShowModal(false);
      fetchRequests();
    } catch (error) {
      alert("Failed to approve: " + error.message);
    }
  };

  const handleReject = async (student) => {
    const reason = rejectionInputs[student.id];
    if (!reason || reason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }
    try {
      await updateDoc(doc(db, "pendingStudents", student.id), {
        status: "rejected",
        rejectionReason: reason,
      });
      alert(`Rejected ${student.name}`);
      fetchRequests();
    } catch (error) {
      alert("Error occured: " + error.message);
    }
  };

  const totalPages = Math.ceil(requests.length / PAGE_SIZE);
  const currentRequests = requests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Layout role={["admin", "superadmin"]}>
      <div className="container mt-4">
        <h4>Pending Student Applications</h4>

        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="primary" />
            <p>Loading students...</p>
          </div>
        ) : currentRequests.length === 0 ? (
          <p className="text-center mt-4">No pending requests.</p>
        ) : (
          <div className="table-responsive mt-3">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Rejection Comment (optional):</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.class}</td>
                    <td>{s.roll}</td>
                    <td>{s.email}</td>
                    <td>{s.phone}</td>
                    <td>
                      <textarea
                        className="form-control mt-1"
                        rows="2"
                        placeholder="Enter reason for rejection"
                        value={rejectionInputs[s.id] || ""}
                        onChange={(e) =>
                          setRejectionInputs({
                            ...rejectionInputs,
                            [s.id]: e.target.value,
                          })
                        }
                      ></textarea>
                    </td>
                    <td>
                      <button
                        onClick={() => handleApproveClick(s)}
                        className="btn btn-success btn-sm me-2"
                      >
                        <i className="fas fa-check-circle me-1"></i> Approve
                      </button>
                      <button
                        onClick={() => handleReject(s)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="fas fa-times-circle me-1"></i> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-outline-secondary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Approve Modal */}
      <AssignStudentModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleFinalApprove}
        student={selectedStudent}
      />
    </Layout>
  );
};

export default AdminApprovePage;
