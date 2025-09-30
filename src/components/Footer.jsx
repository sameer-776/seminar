export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Seminar Hall Booking System. All rights reserved.
      </div>
    </footer>
  );
}
