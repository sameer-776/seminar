// src/pages/Booking.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicSeminarsList from '../components/PublicSeminarsList.jsx';
import AvailabilityChecker from '../components/AvailabilityChecker.jsx';
import BookingForm from '../components/BookingForm.jsx';

export default function Booking({ isUserLoggedIn, currentUser, setShowLogin, bookings, handleBookingRequest }) {
  const [view, setView] = useState('request');
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSlotSelect = (date, startTime, endTime) => {
    if (!isUserLoggedIn) {
      setBookingDetails({ date, startTime, endTime });
      setShowLogin(true);
    } else {
      setBookingDetails({ date, startTime, endTime });
      setView('form');
    }
  };

  useEffect(() => {
    if (isUserLoggedIn && bookingDetails && view !== 'form') {
      setView('form');
    }
  }, [isUserLoggedIn, bookingDetails, view]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 py-12 md:py-24"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Seminars & Booking</h1>
      </div>
      <div className="flex justify-center mb-8 space-x-2 sm:space-x-4">
        <button onClick={() => setView('seminars')} className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${view === 'seminars' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Public Seminars</button>
        <button onClick={() => setView('request')} className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${view === 'request' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>Request a Hall</button>
      </div>
      <AnimatePresence mode="wait">
        {view === 'seminars' && <PublicSeminarsList key="seminars" />}
        {view === 'request' && <AvailabilityChecker key="calendar" bookings={bookings} onSlotSelect={handleSlotSelect} />}
        {view === 'form' && <BookingForm key="form" currentUser={currentUser} details={bookingDetails} goBack={() => setView('request')} onSubmit={handleBookingRequest} />}
      </AnimatePresence>
    </motion.div>
  );
};