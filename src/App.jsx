import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { initialBookings } from './data.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import LoginModal from './components/LoginModal.jsx';
import Home from './pages/Home.jsx';
import Facilities from './pages/Facilities.jsx';
import Booking from './pages/Booking.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [bookings, setBookings] = useState(initialBookings);
  const location = useLocation();

  // --- THIS IS THE CRUCIAL PART FOR THEME SWITCHING ---
  useEffect(() => {
    console.log('Theme changed to:', isDarkMode ? 'Dark' : 'Light'); // <-- ADD THIS LINE
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  // ----------------------------------------------------

  const handleBookingRequest = (newBooking) => {
    const date = newBooking.date;
    const updatedBookingsOnDate = bookings[date] ? [...bookings[date], newBooking] : [newBooking];
    setBookings({ ...bookings, [date]: updatedBookingsOnDate });
  };

  const handleUpdateBookingStatus = (date, bookingId, newStatus, newHall = null) => {
    const updatedBookingsOnDate = bookings[date].map(b =>
      b.id === bookingId ? { ...b, status: newStatus, hall: newHall || b.hall } : b
    );
    setBookings({ ...bookings, [date]: updatedBookingsOnDate });
  };

  const pageProps = { isUserLoggedIn, currentUser, setShowLogin, bookings, handleBookingRequest, handleUpdateBookingStatus };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isUserLoggedIn={isUserLoggedIn}
        onLogout={() => { setIsUserLoggedIn(false); setCurrentUser(null); }}
        onLoginClick={() => setShowLogin(true)}
      />
      <main className="flex-grow pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route index element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/booking" element={<Booking {...pageProps} />} />
            <Route path="/admin" element={<Admin {...pageProps} />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <AnimatePresence>
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLoginSuccess={(user) => {
              setIsUserLoggedIn(true);
              setCurrentUser(user);
              setShowLogin(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}