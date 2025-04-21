import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Layout from "../../components/Layout";
import SubjectFormModal from "../../components/SubjectFormModal";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";

const SubjectManagementPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [seletedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, role } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const isSuperAdmin = role === "superadmin";

  const fetchSubjects = async () => {
    try {
      showLoader();
      const snapshot = await getDocs(collection(db, "subjects"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSubjects(data);
      hideLoader();
    } catch (error) {
      alert("Subject fetching error: " + error.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure want to delete this subject?")) {
      await deleteDoc(doc(db, "subjects", id));
      fetchSubjects();
    }
  };

  const handleSave = async (subject) => {
    try {
      showLoader();
      if (subject.id) {
        const docRef = doc(db, "subjects", subject.id);
        await updateDoc(docRef, {
          name: subject.name,
          code: subject.code,
          papers: subject.papers,
          updateAt: serverTimestamp(),
          updateBy: user?.uid || "",
        });
      } else {
        await addDoc(collection(db, "subjects"), {
          name: subject.name,
          code: subject.code,
          papers: subject.papers,
          createdBy: user?.uid || "", // You can dynamically pass uid
          createdAt: serverTimestamp(),
        });
      }
      hideLoader();
      setSelectedSubject(null);
      setShowModal(false);
      fetchSubjects();
    } catch (error) {
      alert("Error occured: " + error.message);
      hideLoader();
    }
  };

  if (!isSuperAdmin) {
    return (
      <Layout role={["admin", "superadmin"]}>
        <div className="container mt-5">
          <h4 className="text-danger">Unauthorized Access</h4>
        </div>
      </Layout>
    );
  }
  return (
    <Layout role={["admin", "superadmin"]}>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Subject Management</h4>
          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setSelectedSubject(null);
              setShowModal(true);
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Subject
          </button>
        </div>
      </div>

      {/* Starting tabular data */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Subject Name</th>
            <th>Code</th>
            <th>Papers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Start mapping subjet */}
          {subjects.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No subjects found.
              </td>
            </tr>
          ) : (
            subjects.map((sub, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{sub.name}</td>
                <td>{sub.code}</td>
                {/* Papers if found */}
                <td>
                  {sub.papers?.map((p) => p.name + "-" + p?.code).join(", ")}
                </td>
                {/* Actions code */}
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => {
                      setSelectedSubject(sub);
                      setShowModal(true); // when click the button current subject selected, open a modal and go for update
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(sub.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* End tabular data */}

      {showModal && (
        <SubjectFormModal
          subject={seletedSubject}
          onClose={() => {
            setShowModal(false);
            setSelectedSubject(null);
          }}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
};

export default SubjectManagementPage;
