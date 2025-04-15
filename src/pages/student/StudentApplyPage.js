import React, { useState } from "react";
import { db, auth } from "../../firebase/firebase-config";
import { addDoc, collection } from "firebase/firestore";

const StudentApplyPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    roll: "",
    class: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    try {
      await addDoc(collection(db, "pendingStudents"), {
        ...form,
        email: user.email,
        uid: user.uid,
        status: "pending",
        createdAt: new Date(),
      });
      alert("Application submitted!");
      setForm({ name: "", phone: "", roll: "", class: "" });
    } catch (error) {
      alert("Failed to apply: ", error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h4>Apply for Registration</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={form.name}
          placeholder="Full Name"
          className="form-control mb-3"
          required
        />
        <input
          name="phone"
          type="tel"
          onChange={handleChange}
          value={form.phone}
          placeholder="Phone"
          className="form-control mb-3"
          required
        />
        <input
          name="roll"
          type="text"
          onChange={handleChange}
          value={form.roll}
          placeholder="Roll Number"
          className="form-control mb-3"
          required
        />
        <input
          type="text"
          name="class"
          onChange={handleChange}
          value={form.class}
          placeholder="Class"
          className="form-control mb-3"
          required
        />
        <button className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
};

export default StudentApplyPage;
