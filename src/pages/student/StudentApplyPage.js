import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";
import { useLoader } from "../../context/LoaderContext";

const StudentApplyPage = () => {
  const { user } = useAuth();
  const uid = user?.uid;
  const { showLoader, hideLoader } = useLoader();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    class: "",
    email: "",
  });

  const [status, setStatus] = useState("draft");
  const [rejectionReason, setRejectionReason] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [classList, setClassList] = useState([]);

  //   Fetch existing application
  useEffect(() => {
    const fetchApplication = async () => {
      showLoader();
      try {
        if (!uid) {
          return;
        }
        // Fetching classes
        const classSnap = await getDocs(collection(db, "classes"));
        const classOptions = classSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClassList(classOptions);

        const docRef = doc(db, "pendingStudents", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm(data);
          setStatus(data.status || "draft");
          setRejectionReason(data.rejectionReason || "");
          if (["submitted", "proccessing"].includes(data.status)) {
            setIsLocked(true);
          }
        }
      } catch (error) {
        alert("Data fetching error: " + error.message);
      }

      hideLoader();
    };
    fetchApplication();
  }, [uid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) alert("Not logged in");
    try {
      await setDoc(doc(db, "pendingStudents", uid), {
        ...form,
        uid,
        status: "submitted",
        rejectionReason: "",
        createdAt: new Date(),
      });
      alert("Application submitted successfully!");
      setIsLocked(true);
      setStatus("submitted");
    } catch (error) {
      alert("Failed to apply: ", error.message);
    }
  };

  return (
    <Layout role={["student"]}>
      <div className="container mt-4">
        <h4>Student Application Form</h4>
        {status === "rejected" && (
          <div className="alert alert-danger">
            <strong>Rejected:</strong> {rejectionReason}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>
            <div className="col-md-6">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Phone</label>
              <input
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                disabled={isLocked}
              />
            </div>
            <div className="col-md-6">
              <label>Class</label>
              <select
                className="form-select"
                name="class"
                value={form.class}
                onChange={handleChange}
                disabled={isLocked}
              >
                <option value="">Select a class</option>
                {classList.map((cls) => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="btn btn-primary" disabled={isLocked}>
            Submit Application
          </button>
        </form>
        {/* <div className="alert alert-warning mt-3">
          {status === "submitted" && "Application is under proccessing."}
        </div> */}
      </div>
    </Layout>
  );
};

export default StudentApplyPage;
