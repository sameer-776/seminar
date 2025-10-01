// src/pages/Booking.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityChecker from '../components/AvailabilityChecker.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { SEMINAR_HALLS } from '../data.js';

export default function Booking({ isUserLoggedIn, currentUser, setShowLogin, bookings, handleBookingRequest }) {
    const [view, setView] = useState('select-hall'); // New default view
    const [selectedHall, setSelectedHall] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    const handleHallSelect = (hall) => {
        setSelectedHall(hall);
        setView('request');
    };

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
    
    const goBackToHallSelection = () => setView('select-hall');
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24">
            <AnimatePresence mode="wait">
                {view === 'select-hall' && (
                    <motion.div key="select-hall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8">Select a Seminar Hall</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {SEMINAR_HALLS.map(hall => (
                                <button key={hall} onClick={() => handleHallSelect(hall)} className="p-6 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                                    <h2 className="font-bold text-xl text-indigo-600 dark:text-indigo-400">{hall}</h2>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
                
                {view === 'request' && <AvailabilityChecker key="calendar" bookings={bookings} onSlotSelect={handleSlotSelect} selectedHall={selectedHall} goBack={goBackToHallSelection}/>}
                
                {view === 'form' && <BookingForm key="form" currentUser={currentUser} details={bookingDetails} goBack={() => setView('request')} onSubmit={handleBookingRequest} selectedHall={selectedHall} />}
            </AnimatePresence>
        </motion.div>
    );
};