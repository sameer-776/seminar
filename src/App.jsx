import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  Settings,
  BookOpen,
  LogIn,
  LogOut,
  Home,
  Sun,
  Moon,
} from "lucide-react";

// Dummy data
const SEMINAR_HALLS = [
  "Main Auditorium",
  "Conference Room A",
  "Conference Room B",
  "Seminar Hall 1",
  "Seminar Hall 2",
];

const BOOKINGS = [
  {
    id: 1,
    hall: "Main Auditorium",
    date: "2023-08-25",
    time: "10:00 AM - 12:00 PM",
    bookedBy: "Dr. Smith",
    status: "booked",
  },
  {
    id: 2,
    hall: "Conference Room A",
    date: "2023-08-26",
    time: "02:00 PM - 04:00 PM",
    bookedBy: "Prof. Johnson",
    status: "pending",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }
    >
      {/* Navbar */}
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Seminar Hall Booking</h1>
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => setPage("home")}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md flex items-center"
              >
                <Home className="w-4 h-4 mr-1" /> Home
              </button>
              <button
                onClick={() => setPage("booking")}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md flex items-center"
              >
                <BookOpen className="w-4 h-4 mr-1" /> Booking
              </button>
              <button
                onClick={() => setPage("admin")}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md flex items-center"
              >
                <Settings className="w-4 h-4 mr-1" /> Admin
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="hover:bg-indigo-700 px-3 py-2 rounded-md flex items-center"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 mr-1" />
                ) : (
                  <Moon className="w-4 h-4 mr-1" />
                )}
                {darkMode ? "Light" : "Dark"}
              </button>
              <button
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="bg-white text-indigo-600 hover:bg-gray-100 px-3 py-2 rounded-md flex items-center"
              >
                {isLoggedIn ? (
                  <LogOut className="w-4 h-4 mr-1" />
                ) : (
                  <LogIn className="w-4 h-4 mr-1" />
                )}
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" />}
        {page === "booking" && (
          <BookingPage
            key="booking"
            selectedHall={selectedHall}
            setSelectedHall={setSelectedHall}
          />
        )}
        {page === "admin" && <AdminDashboard key="admin" />}
      </AnimatePresence>
    </div>
  );
}

function HomePage() {
  return (
    <motion.div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Welcome to the Seminar Hall Booking System
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Book and manage seminar halls with ease. Choose from multiple halls,
        check availability, and manage bookings through an intuitive interface.
      </p>
    </motion.div>
  );
}

function BookingPage({ selectedHall, setSelectedHall }) {
  const [view, setView] = useState("seminars");

  return (
    <motion.div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Book a Seminar Hall
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar with halls */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Facilities</h3>
          <div className="space-y-2">
            {SEMINAR_HALLS.map((hall) => (
              <button
                key={hall}
                onClick={() => setSelectedHall(hall)}
                className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                  selectedHall === hall
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {hall}
              </button>
            ))}
          </div>
        </div>

        {/* Booking details */}
        <div className="md:col-span-2 space-y-6">
          {selectedHall ? (
            <div>
              <h3 className="text-2xl font-semibold mb-4">{selectedHall}</h3>
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setView("seminars")}
                  className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${
                    view === "seminars"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  Upcoming Seminars
                </button>
                <button
                  onClick={() => setView("book")}
                  className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${
                    view === "book"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  Book Now
                </button>
              </div>

              {view === "seminars" ? (
                <ul className="space-y-3">
                  {BOOKINGS.filter((b) => b.hall === selectedHall).map((b) => (
                    <li
                      key={b.id}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{b.date}</p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {b.time}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          By: {b.bookedBy}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          b.status === "booked"
                            ? "bg-green-200 text-green-800"
                            : b.status === "pending"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {b.status}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <h4 className="text-lg font-semibold mb-4">Booking Form</h4>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="date"
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="time"
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 rounded"
                    >
                      Submit Request
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              Select a seminar hall to view details and book.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function AdminDashboard() {
  return (
    <motion.div
      className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-indigo-600">
        Admin Dashboard
      </h2>
      <div className="space-y-4">
        {BOOKINGS.map((b) => (
          <div
            key={b.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{b.hall}</p>
              <p className="text-gray-600 dark:text-gray-300">
                {b.date} | {b.time}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By: {b.bookedBy}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                b.status === "booked"
                  ? "bg-green-200 text-green-800"
                  : b.status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {b.status}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default App;
