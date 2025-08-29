import React, { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  User,
  MessageSquare,
  Globe,
  Shield,
  HeadphonesIcon,
  Loader
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.message.trim()) {
      setError("Message is required");
      return false;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backendURL}/contact/submit`, formData);
      console.log("Contact form submitted:", response.data);
      
      setSubmitted(true);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
      
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Address",
      details: ["Gram Seva Center, Village Road", "Mumbai, Maharashtra 400001", "India"],
      color: "text-blue-600"
    },
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+91 98765 43210", "+91 22 1234 5678", "24/7 Support Available"],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["support@gramseva.com", "contact@gramseva.com", "Response within 24 hours"],
      color: "text-purple-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 8:00 PM", "Saturday: 10:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or need assistance? We're here to help! Reach out to us through any of the channels below 
            or send us a message using the contact form.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 ${info.color}`}>
                  <info.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className={`text-sm ${idx === info.details.length - 1 ? 'text-gray-500 text-xs' : 'text-gray-700'}`}>
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="text-green-800 font-medium">Message sent successfully!</p>
                  <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                * Required fields. We respect your privacy and will never share your information.
              </p>
            </form>
          </div>

          {/* Additional Information & Map */}
          <div className="space-y-8">
            {/* Why Contact Us */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Contact Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HeadphonesIcon className="text-blue-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Customer Support</h4>
                    <p className="text-gray-600 text-sm">Get help whenever you need it with our round-the-clock support team.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="text-green-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Secure & Private</h4>
                    <p className="text-gray-600 text-sm">Your information is protected with industry-standard security measures.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="text-purple-600" size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Multi-Language Support</h4>
                    <p className="text-gray-600 text-sm">We provide support in multiple languages for your convenience.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 pb-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Find Us</h3>
                    <p className="text-gray-600">Visit our office in the heart of Mumbai's business district.</p>
                  </div>
                  <button
                    onClick={() => window.open('https://maps.google.com?q=Business+District+Mumbai+Maharashtra+India', '_blank')}
                    className="bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <MapPin size={16} />
                    Open in Maps
                  </button>
                </div>
              </div>
              
              {/* Embedded Google Map */}
              <div className="h-64 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709656!3d19.08219783824956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-t-none"
                  title="Our Office Location in Mumbai"
                />
                
                {/* Overlay for click interaction */}
                <div 
                  className="absolute inset-0 bg-transparent cursor-pointer"
                  onClick={() => window.open('https://maps.google.com?q=Gram+Seva+Center+Mumbai+Maharashtra+India', '_blank')}
                  title="Click to open in Google Maps"
                />
              </div>
              
              <div className="p-4 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Easily accessible by public transport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🅿️</span>
                    <span>Free parking available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚇</span>
                    <span>Nearest Metro: Andheri Station</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>15 min walk from station</span>
                  </div>
                </div>
                
                {/* Address and Directions */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Gram Seva Center, Village Road</p>
                      <p className="text-gray-600 text-sm">Mumbai, Maharashtra 400001, India</p>
                    </div>
                    <button
                      onClick={() => window.open('https://maps.google.com/dir//Business+District+Mumbai+Maharashtra+India', '_blank')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                    >
                      Get Directions
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How quickly will you respond?</h3>
              <p className="text-gray-600 text-sm mb-4">We typically respond to messages within 24 hours during business days, and within 48 hours on weekends.</p>
              
              <h3 className="font-semibold text-gray-900 mb-2">What information should I include?</h3>
              <p className="text-gray-600 text-sm">Please provide as much detail as possible about your inquiry, including any relevant order numbers or account information.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Can I call instead of using the form?</h3>
              <p className="text-gray-600 text-sm mb-4">Absolutely! You can reach us at +91 98765 43210 during business hours for immediate assistance.</p>
              
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer emergency support?</h3>
              <p className="text-gray-600 text-sm">Yes, for urgent service-related issues, our emergency hotline is available 24/7 at +91 22 1234 5678.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}