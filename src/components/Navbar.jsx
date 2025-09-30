import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            Seminar Hall Booking
          </h1>
          <div className="space-x-4">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500">Home</Link>
            <Link to="/booking" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500">Booking</Link>
            <Link to="/admin" className="text-gray-700 dark:text-gray-300 hover:text-indigo-500">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
