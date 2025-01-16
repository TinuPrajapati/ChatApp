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
          {[
            { label: "Full Name", type: "text", placeholder: "John Doe", value: formData.fullName, icon: <User /> },
            { label: "Email", type: "email", placeholder: "you@example.com", value: formData.email, icon: <Mail /> },
            { label: "Password", type: showPassword ? "text" : "password", placeholder: "••••••••", value: formData.password, icon: <Lock /> },
          ].map(({ label, type, placeholder, value, icon }, idx) => (
            <div key={idx} className="form-control w-[100%]">
              <label className="label ">
                {label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {icon}
                </div>
                <input
                  type={type}
                  className="input input-bordered w-full pl-10 rounded-md"
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [label.toLowerCase().replace(" ", "")]: e.target.value })}
                />
                {label === "Password" && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                  </button>
                )}
              </div>
            </div>
          ))}

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
