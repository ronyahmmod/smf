import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import StudentTable from "../../components/StudentTable";

const AssignFeesPage = () => {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedFees, setSelectedFees] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [assignmentHistory, setAssignmentHistory] = useState([]);

  const { user } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchAssignmentHistory = async () => {
      showLoader();
      try {
        const assignedFeeSnapshot = await getDocs(
          collection(db, "studentFees")
        );
        const history = assignedFeeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAssignmentHistory(history);
      } catch (error) {
        alert("Data fetching error: " + error.message);
      }
      hideLoader();
    };
    const fetchData = async () => {
      showLoader();
      try {
        const studentSnapshot = await getDocs(collection(db, "students"));
        const feeSnapshot = await getDocs(collection(db, "feeStructures"));
        setStudents(
          studentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setFees(feeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        alert("Data fetching error: " + error.message);
      }
      hideLoader();
    };

    fetchData();
    fetchAssignmentHistory();
  }, []);

  const handleSelectedStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleAsssign = async () => {
    if (selectedStudents.length === 0 || selectedFees.length === 0) {
      alert("Please select a student and at least one fee");
      return;
    }
    showLoader();
    for (const studentId of selectedStudents) {
      const assignedFees = selectedFees.map((feeId) => {
        const fee = fees.find((f) => f.id === feeId);
        return {
          feeId,
          feeName: fee.name,
          amount: fee.amount,
          status: "unpaid",
          assignedBy: user.uid,
          assignedAt: Timestamp.now(),
        };
      });

      await setDoc(
        doc(db, "studentFees", studentId),
        {
          studentId,
          assignedFees,
        },
        { merge: true }
      );
      hideLoader();
      alert("Fees assigned successfully.");
      setSelectedFees([]);
      setSelectedStudents([]);
    }
  };
  const classes = [...new Set(students.map((student) => student.class))];
  const filteredStudents = selectedClass
    ? students.filter((s) => s.class === selectedClass)
    : students;
  return (
    <Layout role={["admin", "superadmin"]}>
      <div className="container mt-4">
        <h3>Assign Fees to Student</h3>
        {/* Class Filter */}
        <div className="mb-3">
          <label className="form-label">Filter by Class</label>
          <select
            className="form-select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((cls, idx) => (
              <option key={idx} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Selected Fees:</label>
          <div className="row">
            {fees.map((fee) => (
              <div className="col-md-4" key={fee.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`fee-${fee.id}`}
                    checked={selectedFees.includes(fee.id)}
                    onChange={() =>
                      setSelectedFees((prev) =>
                        prev.includes(fee.id)
                          ? prev.filter((fid) => fid !== fee.id)
                          : [...prev, fee.id]
                      )
                    }
                  />
                  <label className="form-check-label" htmlFor={`fee-${fee.id}`}>
                    {fee.name} - {fee.amount} BDT
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h5 className="mt-4 mb-2">Select Students</h5>
        <StudentTable
          students={filteredStudents}
          onSelectStudent={handleSelectedStudent}
          selectedStudents={selectedStudents}
        />

        <div className="mt-4 text-end">
          <button className="btn btn-success" onClick={handleAsssign}>
            Assign Selected Fees
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AssignFeesPage;
