import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase-config";
import Layout from "../../components/Layout";
import FeeCategoryFormModal from "../../components/FeeCategoryFormModal";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";

const FeeCategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category send to the modal
  const [showModal, setShowModal] = useState(false);
  const { user, role } = useAuth();
  const { showLoader, hideLoader } = useLoader();

  const fetchCategories = async () => {
    showLoader();
    const snapshot = await getDocs(collection(db, "feeCategories"));
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setCategories(data);
    hideLoader();
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteDoc(doc(db, "feeCategories"));
      fetchCategories();
    }
  };

  const handleSave = async (category) => {
    showLoader();
    if (category.id) {
      const docRef = doc(db, "feeCategories", category.id);
      await updateDoc(docRef, {
        ...category,
        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      });
    } else {
      await addDoc(collection(db, "feeCategories"), {
        ...category,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });
    }
    hideLoader();
    setShowModal(false);
    setSelectedCategory(null);
    fetchCategories();
  };

  if (role !== "superadmin") {
    return (
      <Layout role={["superadmin"]}>
        <div className="container mt-5">
          <h4 className="text-danger">Unauthorized Access</h4>
        </div>
      </Layout>
    );
  }

  return (
    <Layout role={["admin", "superadmin"]}>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Fee Structure Management</h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedCategory(null);
              setShowModal(true);
            }}
          >
            <i className="fas fa-plus me-2"></i> Add Fee Category
          </button>
        </div>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.amount} (BDT)</td>
                  <td>{cat.type?.toUpperCase()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowModal(true);
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(cat.id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* End Container */}
      </div>
      {showModal && (
        <FeeCategoryFormModal
          category={selectedCategory}
          onClose={() => {
            setShowModal(false);
            setSelectedCategory(null);
          }}
          onSave={handleSave}
        />
      )}
    </Layout>
  );
};

export default FeeCategoryManagement;
