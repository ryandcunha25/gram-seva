import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard(){
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")||"null"));
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: user?.name || "", phone: user?.phone || "" });

  useEffect(()=> {
    axios.get("/bookings").then(r=> setBookings(r.data)).catch(console.error);
  }, []);

  const saveProfile = async () => {
    try {
      const res = await axios.put("/auth/me", profile);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditing(false);
      alert("Profile updated");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-3">Dashboard</h2>
      <div className="mb-4">
        <h3 className="font-semibold">Welcome, {user?.name}</h3>
        <div>Email: {user?.email}</div>
        <div>Phone: {user?.phone || "—"}</div>
        {editing ? (
          <div className="mt-2 space-y-2">
            <input value={profile.name} onChange={e=>setProfile({...profile, name:e.target.value})} className="p-2 border rounded"/>
            <input value={profile.phone} onChange={e=>setProfile({...profile, phone:e.target.value})} className="p-2 border rounded"/>
            <div>
              <button onClick={saveProfile} className="px-3 py-1 bg-blue-600 text-white rounded mr-2">Save</button>
              <button onClick={()=>setEditing(false)} className="px-3 py-1 border rounded">Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={()=>setEditing(true)} className="mt-2 px-3 py-1 border rounded">Edit Profile</button>
        )}
      </div>

      <div>
        <h3 className="font-semibold mb-2">Your Bookings</h3>
        {bookings.length === 0 ? <div>No bookings yet.</div> :
          bookings.map(b => (
            <div key={b._id} className="mb-2 p-3 border rounded">
              <div className="text-sm text-gray-600">{new Date(b.createdAt).toLocaleString()}</div>
              <div>Total: ₹{b.total}</div>
              <div>Items:
                <ul className="list-disc ml-6">
                  {b.items.map((it, idx) => <li key={idx}>{it.name} x{it.qty} — ₹{it.price}</li>)}
                </ul>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
