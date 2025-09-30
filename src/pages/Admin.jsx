import { SAMPLE_BOOKINGS } from "../data";

export default function AdminDashboard() {
  return (
    <div className="pt-20 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>

      <div className="grid gap-4">
        {SAMPLE_BOOKINGS.map(b => (
          <div key={b.id} className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <h3 className="font-semibold">{b.hall}</h3>
            <p>{b.date} | {b.time}</p>
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
    </div>
  );
}
