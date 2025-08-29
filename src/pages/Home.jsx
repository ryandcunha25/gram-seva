import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Home() {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    services: true,
    products: true,
  });
  const [error, setError] = useState({
    services: null,
    products: null,
    news: null
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formError, setFormError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const news = [
    { id: "n1", title: "Local health camp scheduled this Saturday" },
    { id: "n2", title: "Government announces subsidy for small farmers" },
    { id: "n3", title: "New cold-storage facility coming to the block" }
  ];

  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch services from backend
    const fetchServices = async () => {
      try {
        setLoading(prev => ({ ...prev, services: true }));
        const response = await fetch(backendURL + "/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data.splice(0, 3));
        setError(prev => ({ ...prev, services: null }));
      } catch (err) {
        setError(prev => ({ ...prev, services: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, services: false }));
      }
    };

    // Fetch products from backend
    const fetchProducts = async () => {
      try {
        setLoading(prev => ({ ...prev, products: true }));
        const response = await fetch(backendURL + "/products/browse");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.splice(0, 6));
        setError(prev => ({ ...prev, products: null }));
      } catch (err) {
        setError(prev => ({ ...prev, products: err.message }));
      } finally {
        setLoading(prev => ({ ...prev, products: false }));
      }
    };

    fetchServices();
    fetchProducts();
  }, [backendURL]);


  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 3000);
  };

  const BookNowProduct = () => {
    if (!localStorage.getItem("token")) {
      showNotification("Please login to book a product.");
      navigate("/login");
      return;
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      return false;
    }
    if (!formData.message.trim()) {
      setFormError("Message is required");
      return false;
    }
    if (formData.email && !isValidEmail(formData.email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (formData.phone && !isValidPhone(formData.phone)) {
      setFormError("Please enter a valid phone number");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formError) setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setContactLoading(true);
    setFormError("");

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
      setFormError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setContactLoading(false);
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="bg-green-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gram Seva</h1>
          <p className="text-xl md:text-2xl mb-8">Essential products & services for rural communities</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => scrollToSection('products')}
              className="px-6 py-3 bg-white text-green-800 font-medium rounded-lg hover:bg-green-100 transition shadow-md"
            >
              Explore Products
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Our Services
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">News & Updates</h2>

          {error.news && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p>Error loading news: {error.news}. Showing fallback data.</p>
            </div>
          )}

          {loading.news ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-6 shadow-md border-l-4 border-green-600">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.date}</p>
                  <button className="mt-4 text-green-700 font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Few of our services</h2>

          {error.services && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p>Error loading services: {error.services}. Showing fallback data.</p>
            </div>
          )}

          {loading.services ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} className="bg-green-50 rounded-lg p-6 shadow-md hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-green-800">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <button className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Some of our available products</h2>

          {error.products && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
              <p>Error loading products: {error.products}. Showing fallback data.</p>
            </div>
          )}

          {loading.products ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-48 bg-green-100 flex items-center justify-center text-6xl">
                    <img src={product.image} alt={product.name} className="h-full object-contain" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                    <p className="text-green-700 font-bold text-lg mb-4">₹{product.price}</p>
                    <button onClick={BookNowProduct} className="w-full px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="mb-6">We'd love to hear from you. Please reach out to us with any questions or concerns.</p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Address: Gram Seva Center, Village Road</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Helpline: +91 98765 43210</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
              {submitted && (
                <div className="bg-green-600 text-white p-4 rounded mb-4">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}
              {formError && (
                <div className="bg-red-600 text-white p-4 rounded mb-4">
                  {formError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone (optional)"
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={contactLoading}
                  className="px-6 py-2 bg-white text-green-800 font-medium rounded hover:bg-green-100 transition disabled:opacity-50"
                >
                  {contactLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Gram Seva</h3>
              <p>Empowering rural communities with essential products and services.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="hover:text-green-300 transition">Home</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-green-300 transition">Services</button></li>
                <li><button onClick={() => scrollToSection('products')} className="hover:text-green-300 transition">Products</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-green-300 transition">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services </h4>
              <ul className="space-y-2">
                {services.slice(0, 4).map(service => (
                  <li key={service.id} className="hover:text-green-300 transition">{service.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="hover:text-green-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                </a>
                <a href="#" className="hover:text-green-300 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.210-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} Gram Seva. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}