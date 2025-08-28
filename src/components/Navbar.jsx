// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Gram Seva</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to="/services" className="hover:underline">Services</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        {!token ? (
          <>
            <Link to="/login" className="ml-2 px-3 py-1 border rounded">Login</Link>
            <Link to="/signup" className="ml-2 px-3 py-1 bg-blue-600 text-white rounded">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="ml-2 px-3 py-1 border rounded">Dashboard</Link>
            <button onClick={logout} className="ml-2 px-3 py-1 bg-red-500 text-white rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
