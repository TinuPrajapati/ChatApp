import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";
import avatar from "../assets/avatar.png"

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="h-[10%] bg-base-100 border-b border-base-300 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-all"
          aria-label="Go to homepage"
        >
          <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h1 className="text-lg font-bold">Chatty</h1>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {authUser ? (
            // Dropdown for authenticated users
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-ghost btn-circle"
                aria-label="User Menu"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={authUser.profile || avatar}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Settings link for unauthenticated users
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
