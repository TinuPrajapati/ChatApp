import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="h-[10%] bg-base-100 border-b border-base-300 sticky top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          aria-label="Go to homepage"
        >
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Chatty</h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          <Link
            to="/settings"
            className="btn btn-sm gap-2 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="btn btn-sm gap-2 transition-colors"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                className="btn btn-sm gap-2 transition-colors"
                onClick={logout}
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
