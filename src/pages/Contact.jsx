import React, { useState } from "react";
import axios from "axios";

export default function Contact(){
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [done, setDone] = useState("");

  const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/contact", form);
      setDone("Message sent. We'll get back to you.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setDone("Failed to send.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl mb-3">Contact Us</h2>
      <p>Address: Gram Seva Center, Village Road</p>
      <p>Helpline: +91 98765 43210</p>

      <form onSubmit={submit} className="mt-4 space-y-3">
        <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="w-full p-2 border rounded"/>
        <input name="email" value={form.email} onChange={onChange} placeholder="Your email" className="w-full p-2 border rounded"/>
        <textarea name="message" value={form.message} onChange={onChange} placeholder="Message" className="w-full p-2 border rounded" rows="4"/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>

      {done && <p className="mt-3 text-green-600">{done}</p>}
    </div>
  );
}
