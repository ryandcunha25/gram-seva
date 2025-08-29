import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    ShoppingCart,
    Truck,
    Home,
    Wrench,
    Heart,
    Coffee,
    ArrowRight,
    Star,
    Clock,
    Shield,
    Users,
    Loader
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Services() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${backendURL}/services`);
            //   console.log("Fetched services:", response.data);   
            setServices(response.data);
            setError(null);
        } catch (err) {
            console.error("Failed to fetch services:", err);
            setError("Failed to load services from server. Showing available services.");
        } finally {
            setLoading(false);
        }
    };

    // Icon mapping 
    const getIconComponent = (iconString, service) => {
        const iconMap = {
            "🛒": ShoppingCart,
            "🏠": Home,
            "🔧": Wrench,
            "❤️": Heart,
            "☕": Coffee,
            "👕": Home,
        };

        const IconComponent = iconMap[iconString] || ShoppingCart;
        return <IconComponent size={32} className="text-white" />;
    };

    const getGradientClass = (index) => {
        const gradients = [
            "from-blue-500 to-blue-600",
            "from-green-500 to-green-600",
            "from-purple-500 to-purple-600",
            "from-red-500 to-red-600",
            "from-yellow-500 to-orange-500",
            "from-pink-500 to-pink-600",
            "from-indigo-500 to-indigo-600",
            "from-teal-500 to-teal-600"
        ];
        return gradients[index % gradients.length];
    };

    const handleServiceClick = (service) => {
        // Navigate to related products or service booking page
        alert(`Redirecting to ${service.name} booking page...`);
        // In a real app, you would use: navigate(`/services/${service._id}`) or navigate(`/products?category=${service.category}`)
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                size={12}
                className={`${i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                    }`}
            />
        ));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
                        <p className="text-gray-600 text-lg">Loading services...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We provide comprehensive services to make your life easier and more convenient.
                        Choose from our wide range of professional services.
                    </p>

                    {error && (
                        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
                            <p className="text-yellow-800">{error}</p>
                        </div>
                    )}

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <div className="text-2xl font-bold text-blue-600">{services.length}+</div>
                            <div className="text-gray-600">Services</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <div className="text-2xl font-bold text-green-600">10k+</div>
                            <div className="text-gray-600">Happy Customers</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <div className="text-2xl font-bold text-purple-600">24/7</div>
                            <div className="text-gray-600">Support</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            <div className="text-2xl font-bold text-orange-600">4.8★</div>
                            <div className="text-gray-600">Rating</div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={service._id}
                            onClick={() => handleServiceClick(service)}
                            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 overflow-hidden flex flex-col h-full"
                        >
                            {/* Service Icon Header */}
                            <div className={`bg-gradient-to-r ${getGradientClass(index)} p-6 text-center relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                <div className="relative z-10">
                                    {typeof service.icon === 'string' && service.icon.length === 2 ? (
                                        <div className="text-4xl mb-2">{service.icon}</div>
                                    ) : (
                                        <div className="w-16 h-16 mx-auto mb-2 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                            {getIconComponent(service.icon, service)}
                                        </div>
                                    )}

                                    {service.category && (
                                        <span className="bg-white bg-opacity-20 text-white text-xs px-3 py-1 rounded-full">
                                            {service.category}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Service Details */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {service.name}
                                </h3>

                                {service.description && (
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {service.description}
                                    </p>
                                )}

                                {/* Rating */}
                                {service.rating && (
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex">{renderStars(service.rating)}</div>
                                        <span className="text-sm text-gray-600">({service.rating})</span>
                                    </div>
                                )}

                                {/* Price */}
                                {service.price && (
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-lg font-bold text-green-600">{service.price}</span>
                                    </div>
                                )}

                                {/* Features */}
                                {service.features && (
                                    <div className="mb-4">
                                        <ul className="text-xs text-gray-600 space-y-1">
                                            {service.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Spacer to push button to bottom */}
                                <div className="flex-grow"></div>

                                {/* Action Button */}
                                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2 font-medium group-hover:shadow-lg mt-auto">
                                    Book Now
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Additional Features Section */}
                <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Why Choose Our Services?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
                            <p className="text-gray-600">All our service providers are verified and insured for your peace of mind.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quick & Reliable</h3>
                            <p className="text-gray-600">Fast response times and reliable service delivery when you need it most.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Expert Professionals</h3>
                            <p className="text-gray-600">Skilled professionals with years of experience in their respective fields.</p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">Need a Custom Service?</h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Can't find what you're looking for? Contact us for personalized service solutions
                            tailored to your specific needs.
                        </p>
                        <Link to="/contact">
                            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}