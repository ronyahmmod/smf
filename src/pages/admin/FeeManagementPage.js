import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";
import Layout from "../../components/Layout";
import FeeFormModal from "../../components/FeeFormModal";

const FeeManagementPage = () => {
  const [fees, setFees] = useState([]);
  const [modalFee, setModalFee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, role } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const isSuperAdmin = role === "superadmin";

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "feeStructures"), (snap) => {
      const feesData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFees(feesData);
    });
    return unsub;
  }, []);

  const handleSave = async (feeData) => {
    showLoader();
    try {
      if (feeData.id) {
        const ref = doc(db, "feeStructures", feeData.id);
        await updateDoc(ref, {
          ...feeData,
          updatedAt: serverTimestamp(),
          updatedBy: user.uid,
        });
      } else {
        await addDoc(collection(db, "feeStructures"), {
          ...feeData,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
        });
      }
      setShowModal(false);
    } catch (error) {
      alert("Error saving fee: " + error.message);
    } finally {
      hideLoader();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this fee?")) return;
    await deleteDoc(doc(db, "feeStructures", id));
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
        <h4>Fee Structure Management</h4>
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            setModalFee(null);
            setShowModal(true);
          }}
        >
          Add New Fee
        </button>

        {/* Tabular data start */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Fee Name</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {fees.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No subjects found.
                </td>
              </tr>
            ) : (
              fees.map((fee) => (
                <tr key={fee.id}>
                  <td>{fee.name}</td>
                  <td>{fee.amount}</td>
                  <td>{fee.reason}</td>
                  <td>
                    {fee.documentURL ? (
                      <a
                        href={fee.documentURL}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => {
                        setModalFee(fee);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(fee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {showModal && (
          <FeeFormModal
            fee={modalFee}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </Layout>
  );
};

export default FeeManagementPage;
