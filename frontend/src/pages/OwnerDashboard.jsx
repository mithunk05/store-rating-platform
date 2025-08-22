import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const OwnerDashboard = () => {
  const { user, setUser, setToken } = useAuth();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    // Fetch owned stores and their ratings
    axios
      .get(`${API_URL}/stores?ownerId=${user.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setStores(res.data));
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} | Avg Rating: {store.avgRating}
            {/* Add listing of users who rated */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnerDashboard;