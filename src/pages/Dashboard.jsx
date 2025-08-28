import React, { useEffect, useState } from "react";
import axios from "axios";
import { User, Edit3, Save, X, Calendar, Package, Phone, Mail, ShoppingBag, Clock, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [bookings, setBookings] = useState([]);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ 
    name: user?.name || "", 
    phone: user?.phone || "",
    email: user?.email || ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    try {
      const res = await axios.put("/auth/me", profile);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditing(false);
      // Success notification
      showNotification("Profile updated successfully!", "success");
    } catch (err) {
      showNotification("Update failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type) => {
    // Simple notification - you can replace with a toast library
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const getStatusBadge = (status = "confirmed") => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };

    const StatusIcon = status === "confirmed" ? CheckCircle : Clock;

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
        <StatusIcon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || "User"}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Manage your profile and track your bookings</p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <User size={20} />
                Profile Information
              </h3>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              )}
            </div>

            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={saveProfile}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Save size={16} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setProfile({ name: user?.name || "", phone: user?.phone || "", email: user?.email || "" });
                    }}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <User className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{user?.name || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <Mail className="text-green-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{user?.email || "Not set"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                  <Phone className="text-purple-600" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{user?.phone || "Not set"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/products"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <ShoppingBag size={32} />
              <div>
                <h3 className="text-xl font-semibold">Browse Products</h3>
                <p className="opacity-90">Discover our latest offerings</p>
              </div>
            </div>
          </a>
          <a
            href="/services"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <div className="flex items-center gap-4">
              <Package size={32} />
              <div>
                <h3 className="text-xl font-semibold">Book Services</h3>
                <p className="opacity-90">Schedule your next service</p>
              </div>
            </div>
          </a>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-blue-600" size={24} />
            <h3 className="text-2xl font-semibold text-gray-900">Your Bookings</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Package className="mx-auto text-gray-400 mb-4" size={48} />
              <h4 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h4>
              <p className="text-gray-600 mb-6">Start by browsing our products or services</p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/products"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse Products
                </a>
                <a
                  href="/services"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Book Service
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking, index) => (
                <div key={booking._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Booking #{booking._id?.slice(-6)}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} />
                          {new Date(booking.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(booking.status)}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Items Ordered:</h4>
                      <div className="space-y-2">
                        {booking.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Package size={14} className="text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                              </div>
                            </div>
                            <p className="font-semibold text-gray-900">₹{item.price}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:border-l lg:border-gray-200 lg:pl-6">
                      <h4 className="font-medium text-gray-900 mb-3">Order Summary:</h4>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                          <span className="text-2xl font-bold text-blue-600">₹{booking.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}