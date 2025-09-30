import { motion } from "framer-motion";

export default function LoginModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center"
      >
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg p-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg p-2"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
          >
            Login
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-600 hover:text-red-600"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
