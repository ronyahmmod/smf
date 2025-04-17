import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import ClassFormModal from "../../components/ClassFormModal";
import { useAuth } from "../../context/AuthContext";

const ClassManagementPage = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const { user } = useAuth();

  const SUPER_ADMIN_ID = "your_super_admin_id_here"; // REPLACE WITH REAL ID LATTER

  const fetchClasses = async () => {
    const snapshot = await getDocs(collection(db, "classes"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAddOrUpdate = async (className, editingId = null) => {
    if (editingId) {
      // Update latter if needed
    } else {
      await addDoc(collection(db, "classes"), {
        name: className,
        createdAt: Timestamp.now(),
        createdBy: user.id,
      });
    }
    fetchClasses();
    setShowModal(false);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, "classes", id));
      fetchClasses();
    }
  };

  if (user.uid !== SUPER_ADMIN_ID) {
    return (
      <Layout role={["admin"]}>
        <div className="container mt-5">
          <h4 className="text-danger">Unauthorized Access</h4>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={["admin"]}>
      <div className="container mt-4">
        <h4 className="mb-4">Class Management</h4>
        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Add New Class
        </button>
      </div>
      <table className="table table-bordered">
        {classes.map((cls, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{cls.name}</td>
              {/* Edit feature in future */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(cls.id)}
              >
                Delete
              </button>
            </tr>
          );
        })}
        {classes.length === 0 && (
          <tr>
            <td colSpan="3" className="text-center text-muted">
              No classes available.
            </td>
          </tr>
        )}
      </table>
      {showModal && (
        <ClassFormModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddOrUpdate}
        />
      )}
    </Layout>
  );
};

export default ClassManagementPage;
