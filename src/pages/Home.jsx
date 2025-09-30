import { motion } from "framer-motion";
import { SEMINAR_HALLS } from "../data";
import { useState } from "react";

export default function HomePage() {
  const [selectedHall, setSelectedHall] = useState(null);

  return (
    <div className="pt-20 px-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-6"
      >
        Welcome to Seminar Hall Booking System
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          {SEMINAR_HALLS.map(hall => (
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

        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {selectedHall ? (
            <h3 className="text-xl font-semibold">You selected: {selectedHall}</h3>
          ) : (
            <p className="text-gray-500">Click a hall to view details</p>
          )}
        </div>
      </div>
    </div>
  );
}
