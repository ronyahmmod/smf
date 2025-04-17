import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

/*
IN FUTURE USE- We store data to firestore

import { getFirestore, setDoc, doc } from "firebase/firestore";
import { auth } from "../firebase/firebase-config";

const db = getFirestore();

await setDoc(doc(db, "users", auth.currentUser.uid), {
  email,
  role,
});
*/

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const userDoc = await getDoc(doc(db, "users", uid));
      const role = userDoc.data()?.role;
      // const role = localStorage.getItem("userRole"); [Now it is not required, Role is managed by firebase]
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "student") navigate("/student-dashboard");
      else alert("Invalid role.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success">Login</button>
      </form>
      <p className="mt-3">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default LoginPage;
