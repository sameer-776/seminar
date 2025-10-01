// src/pages/Booking.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AvailabilityChecker from '../components/AvailabilityChecker.jsx';
import BookingForm from '../components/BookingForm.jsx';
import PublicSeminarsList from '../components/PublicSeminarsList.jsx';
import { SEMINAR_HALLS } from '../data.js';

// This is a new sub-component to contain the multi-step booking flow
const HallBookingFlow = ({ isUserLoggedIn, currentUser, setShowLogin, bookings, handleBookingRequest }) => {
    const [view, setView] = useState('select-hall'); // 'select-hall', 'request', 'form'
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

    return (
        <AnimatePresence mode="wait">
            {view === 'select-hall' && (
                <motion.div key="select-hall" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">1. Select a Seminar Hall</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {SEMINAR_HALLS.map(hall => (
                            <button key={hall} onClick={() => handleHallSelect(hall)} className="p-6 text-left bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                                <h3 className="font-bold text-xl text-indigo-600 dark:text-indigo-400">{hall}</h3>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {view === 'request' && <AvailabilityChecker key="calendar" bookings={bookings} onSlotSelect={handleSlotSelect} selectedHall={selectedHall} goBack={() => setView('select-hall')} />}

            {view === 'form' && <BookingForm key="form" currentUser={currentUser} details={bookingDetails} goBack={() => setView('request')} onSubmit={handleBookingRequest} selectedHall={selectedHall} />}
        </AnimatePresence>
    );
};


export default function Booking(props) {
    const [pageView, setPageView] = useState('book'); // 'book' or 'seminars'

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Seminars & Booking</h1>
            </div>

            {/* Main Tabs */}
            <div className="flex justify-center mb-8 space-x-2 sm:space-x-4">
                <button onClick={() => setPageView('book')} className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${pageView === 'book' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    Book a Hall
                </button>
                <button onClick={() => setPageView('seminars')} className={`px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base ${pageView === 'seminars' ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                    Public Seminars
                </button>
            </div>
            
            <AnimatePresence mode="wait">
                {pageView === 'book' && (
                    <motion.div key="book-flow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <HallBookingFlow {...props} />
                    </motion.div>
                )}
                {pageView === 'seminars' && (
                    <motion.div key="seminars-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <PublicSeminarsList />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};