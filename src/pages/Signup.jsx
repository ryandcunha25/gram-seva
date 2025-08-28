import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup(){
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Signup</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} className="w-full p-2 border rounded"/>
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full p-2 border rounded"/>
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} className="w-full p-2 border rounded"/>
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={onChange} className="w-full p-2 border rounded"/>
        <button className="w-full p-2 bg-blue-600 text-white rounded">Signup</button>
      </form>
    </div>
  );
}
