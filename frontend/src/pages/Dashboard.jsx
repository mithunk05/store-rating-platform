import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, setUser, setToken } = useAuth();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/stores`, {
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
      <h2>Welcome, {user.name}</h2>
      <button onClick={logout}>Logout</button>
      <h3>Stores</h3>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            {store.name} ({store.address}) | Avg Rating: {store.avgRating}
          </li>
        ))}
      </ul>
      {/* Add more features: search, rate, etc. */}
    </div>
  );
};

export default Dashboard;