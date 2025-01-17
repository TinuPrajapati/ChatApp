import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Invalid email format");
    if (!password) return toast.error("Password is required");
    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) signup(formData);
  };

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="flex w-full h-[90%] p-4">
      {/* Left side */}
      <div className="flex flex-col sm:px-12 sm:py-0 w-1/2 h-full p-12">
        {/* Logo */}
        <div className="text-center flex flex-col items-center mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-base-content/60">Get started with your free account</p>
        </div>

        {/* Sign-up Form */}
        <form onSubmit={handleSubmit} className=" w-[100%] flex flex-col items-center">
          {/* Name Input */}
          <div className="form-control w-full">
            <label className="label pl-4" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="h-5 w-5 text-base-content/40 absolute left-3 pointer-events-none" />
              <input
              id="fullName"
                type="text"
                className="input input-bordered w-full pl-10 rounded-md"
                placeholder="Enter your Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Email Input */}
          <div className="form-control w-full">
            <label className="label pl-4" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="h-5 w-5 text-base-content/40 absolute left-3 pointer-events-none" />
              <input
                id="email"
                type="email"
                className="input input-bordered w-full pl-10 rounded-md"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <label className="label pl-4" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="h-5 w-5 text-base-content/40 absolute left-3 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 rounded-md"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-[50%] mt-3 rounded-md text-xl" disabled={isSigningUp}>
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Sign-in Link */}
        <div className="text-center mt-2">
          <p className="text-base-content/60">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
