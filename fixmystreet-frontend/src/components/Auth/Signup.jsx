// src/components/Auth/Signup.jsx
import React, { useState } from "react";
import { API } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setMessage("Signup successful! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Sign Up</h2>
        {message && <p>{message}</p>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
