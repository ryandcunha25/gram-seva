import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products(){
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  useEffect(()=> {
    axios.get("/products").then(r => setProducts(r.data)).catch(console.error);
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  const bookNow = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) return nav("/login");
    try {
      const body = { items: [{ productId: product.id, name: product.name, price: product.price, qty: 1 }], total: product.price };
      await axios.post("/bookings", body);
      alert("Booking saved! Check Dashboard.");
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Products</h2>
      <input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} className="p-2 border rounded w-full mb-4"/>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div key={p.id} className="p-3 border rounded">
            <div className="font-semibold">{p.name}</div>
            <div className="text-gray-600">₹{p.price}</div>
            <button onClick={()=>bookNow(p)} className="mt-2 px-3 py-1 bg-green-600 text-white rounded">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
