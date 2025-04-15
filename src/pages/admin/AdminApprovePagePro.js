import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const AdminApprovePage = () => {
  const [requests, setRequests] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 5;

  const fetchRequests = async (nextPage = false) => {
    setLoading(true);
    let q = query(
      collection(db, "pendingStudents"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );
    if (nextPage && lastDoc) {
      q = query(
        collection(db, "pendingStudents"),
        orderBy("createdAt", "desc"),
        startAfter(lastDoc),
        limit(PAGE_SIZE)
      );
    }
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setRequests((prev) => (nextPage ? [...prev, ...data] : data));
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setHasMore(snapshot.docs.length === PAGE_SIZE);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (student) => {
    try {
      await addDoc(collection(db, "students"), {
        name: student.name,
        email: student.email,
        phone: student.phone,
        roll: student.roll,
        class: student.class,
        uid: student.uid,
        createdAt: new Date(),
      });
      await deleteDoc(doc(db, "pendingStudents", student.id));
      alert(`Approved ${student.name}`);
      fetchRequests();
    } catch (error) {
      alert("Failed to approve: " + error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      await deleteDoc(doc(db, "pendingStudents", id));
      alert("Apllication Rejected");
      fetchRequests();
    } catch (error) {
      alert("Error occured: ", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Pending Student Application</h4>
      {requests.length === 0} ? <p>No pending requests.</p>:
      {requests.map((s) => (
        <div key={s.id} className="card p-3 mb-3">
          <h5>
            {s.name} ({s.class})
          </h5>
          <p>
            <b>Roll: </b> {s.roll} | <b>Email: </b>
            {s.email}
          </p>
          <p>
            <b>Phone: </b>
            {s.phone}
          </p>
          <button
            onClick={() => handleApprove(s)}
            className="btn btn-success me-2"
          >
            Approve
          </button>
          <button
            onCanPlay={() => handleReject(s.id)}
            className="btn btn-danger"
          >
            Reject
          </button>
        </div>
      ))}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => fetchRequests(true)}
            disabled={loading}
            className="btn btn-outline-primary"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminApprovePage;
