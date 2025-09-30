import { useState } from "react";

export default function Facilities() {
  const halls = ["Main Auditorium", "Mini Hall A", "Mini Hall B", "Conference Room"];
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Facilities</h2>
      <div className="grid gap-3">
        {halls.map(hall => (
          <button
            key={hall}
            onClick={() => setSelected(hall)}
            className={`w-full text-left p-4 rounded-lg transition ${
              selected === hall
                ? "bg-indigo-600 text-white"
                : "bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-gray-700"
            }`}
          >
            {hall}
          </button>
        ))}
      </div>
      {selected && (
        <div className="mt-4 p-4 border dark:border-gray-700 rounded-md">
          <h3 className="font-semibold mb-2">{selected}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Capacity: 200 • Projector: Yes • Air Conditioned: Yes
          </p>
        </div>
      )}
    </div>
  );
}
