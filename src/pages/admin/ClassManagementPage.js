import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ClassFormModal from "../../components/ClassFormModal";
import { useAuth } from "../../context/AuthContext";
import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../../services/classService";

const ClassManagementPage = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { user } = useAuth();

  const isSuperAdmin = user?.role === "superadmin";

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleEdit = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deleteClass(id);
      fetchClasses();
    }
  };

  const handleSubmit = async (form) => {
    if (editData) {
      await updateClass(editData.id, form);
    } else {
      await addClass(form);
    }
    setShowModal(true);
    fetchClasses();
  };

  if (!isSuperAdmin) {
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
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-4">Class Management</h4>
          <button
            className="btn btn-primary mb-3"
            onClick={() => setShowModal(true)}
          >
            Add New Class
          </button>
        </div>
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => {
            return (
              <tr key={cls.id}>
                <td>{cls.name}</td>
                <td>{cls.description}</td>
                {/* Edit feature in future */}
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(cls)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(cls.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>

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
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          initialData={editData}
        />
      )}
    </Layout>
  );
};

export default ClassManagementPage;
