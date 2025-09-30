import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

export default function Header({ onLogin, darkMode, toggleDarkMode }) {
  const location = useLocation();
  const links = [
    { to: "/", label: "Home" },
    { to: "/facilities", label: "Facilities" },
    { to: "/booking", label: "Booking" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          Seminar Hall Booking
        </h1>

        <nav className="flex items-center gap-3">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded-md font-medium ${
                location.pathname === link.to
                  ? "bg-indigo-500 text-white"
                  : "hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onLogin}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-md"
          >
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
