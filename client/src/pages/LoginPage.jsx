import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIng } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex w-full h-[90%] p-4">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center sm:p-12 w-1/2 h-full p-12">
        <div className="text-center flex flex-col items-center gap-2 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mt-1">Welcome Back</h1>
          <p className="text-base-content/60">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className=" w-[90%] flex flex-col items-center">
          {/* Email Input */}
          <div className="form-control w-full">
            <label className="label pl-4">
              Email
            </label>
            <div className="relative flex items-center">
              <Mail className="h-5 w-5 text-base-content/40 absolute left-3 pointer-events-none" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 rounded-md"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <label className="label pl-4">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="h-5 w-5 text-base-content/40 absolute left-3 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 rounded-md"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
          <button type="submit" className="btn btn-primary w-[50%] rounded-md mt-4 text-xl" disabled={isLoggingIng}>
            {isLoggingIng ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="text-center mt-4">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
        />
    </div>
  );
};

export default LoginPage;
