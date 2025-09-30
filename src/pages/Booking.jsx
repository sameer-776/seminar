import { useState } from "react";

export default function BookingPage() {
  const [view, setView] = useState("seminars");

  return (
    <div className="pt-20 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">Booking Page</h2>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setView("seminars")}
          className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${
            view === "seminars" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Seminars
        </button>
        <button
          onClick={() => setView("conferences")}
          className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${
            view === "conferences" ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          Conferences
        </button>
      </div>

      {view === "seminars" ? (
        <p className="text-center">📘 Seminar booking section here</p>
      ) : (
        <p className="text-center">📗 Conference booking section here</p>
      )}
    </div>
  );
}
