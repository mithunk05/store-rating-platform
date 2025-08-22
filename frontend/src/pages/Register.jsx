import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/users/register`, form);
      navigate("/login");
    } catch (err) {
      setError("Registration failed: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <div className="container mt-5">
      <form className="card p-4 mx-auto" style={{ maxWidth: 500 }} onSubmit={handleSubmit}>
        <h2 className="mb-3 text-center">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            className="form-control"
            name="name"
            onChange={handleChange}
            placeholder="Full Name (20-60 chars)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="email"
            onChange={handleChange}
            placeholder="Email"
            type="email"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="address"
            onChange={handleChange}
            placeholder="Address (max 400 chars)"
            required
          />
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <button className="btn btn-success w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;