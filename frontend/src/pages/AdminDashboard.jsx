import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const { setUser, setToken } = useAuth();
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    axios
      .get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDashboard(res.data));
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div>
        <p>Total Users: {dashboard.totalUsers}</p>
        <p>Total Stores: {dashboard.totalStores}</p>
        <p>Total Ratings: {dashboard.totalRatings}</p>
      </div>
      {/* Add user/store management UI */}
    </div>
  );
};

export default AdminDashboard;