import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";

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
      await signInWithEmailAndPassword(auth, email, password);
      const role = localStorage.getItem("userRole");
      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/student-dashboard");
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
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
};

export default LoginPage;
