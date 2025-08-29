import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, AlertCircle, Check } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Note: In real implementation, you'd use react-router-dom's useNavigate
  const nav = useNavigate();
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const onChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Calculate password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    try {
      const res = await axios.post(`${backendURL}/user/register`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registration successful! Please log in.");
      nav("/login");
    } catch (error) {
      setErr("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-400";
    if (passwordStrength <= 2) return "bg-yellow-400";
    if (passwordStrength <= 3) return "bg-blue-400";
    return "bg-green-400";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-cyan-50 via-white to-emerald-50 flex items-center justify-center p-4" style={{ minHeight: '100vh' }}>
      {/* Fixed background that covers entire page */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-cyan-10 -z-10"></div>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-0 -left-40 w-80 h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
      </div>

      <div className="relative w-full max-h-fit max-w-md">
        {/* Main signup card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center">
              <img src={require(`../assets/images/Logo.png`)} alt="Logo" className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-600">Join us at GramSeva and start your journey</p>
          </div>

          {/* Error message */}
          {err && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{err}</span>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or create account with email</span>
            </div>
          </div>

          {/* Signup form */}
          <div className="space-y-4">
            {/* Name input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Email input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Phone input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
              </div>
            </div>

            {/* Password input with strength indicator */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={onChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-900 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {form.password && (
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{getStrengthText()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`flex items-center space-x-1 ${form.password.length >= 8 ? 'text-green-600' : 'text-gray-900'}`}>
                      <Check className="w-3 h-3" />
                      <span>8+ characters</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${/[A-Z]/.test(form.password) ? 'text-green-600' : 'text-gray-900'}`}>
                      <Check className="w-3 h-3" />
                      <span>Uppercase</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${/[0-9]/.test(form.password) ? 'text-green-600' : 'text-gray-900'}`}>
                      <Check className="w-3 h-3" />
                      <span>Number</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${/[^A-Za-z0-9]/.test(form.password) ? 'text-green-600' : 'text-gray-900'}`}>
                      <Check className="w-3 h-3" />
                      <span>Special char</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms and conditions */}
            {/* <div className="flex items-start space-x-3 p-4 bg-gray-50/50 rounded-lg">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Terms of Service
                </button>
                {" "}and{" "}
                <button type="button" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
                  Privacy Policy
                </button>
              </label>
            </div> */}

            {/* Signup button */}
            <button
              type="button"
              onClick={submit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-emerald-700 hover:to-cyan-700 focus:ring-4 focus:ring-emerald-200 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login">
                <button className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
                  Sign in
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Security note */}
        <div className="text-center mt-6 text-xs text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <Lock className="w-4 h-4" />
            <span className="font-medium">Your data is secure</span>
          </div>
          <p>We use industry-standard encryption to protect your information</p>
        </div>
      </div>
    </div>
  );
}