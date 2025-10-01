// src/pages/Admin.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BarChart2, Clock, CheckCircle, XCircle, Pencil, LogIn } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import SuggestionModal from '../components/SuggestionModal.jsx';

export default function Admin({ bookings, handleUpdateBookingStatus }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [suggestionModalData, setSuggestionModalData] = useState(null);
    const [filter, setFilter] = useState('All'); // State for the filter

    // The login form remains the same...
    if (!isLoggedIn) {
        const loginVariants = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } }, exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } } };
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <AnimatePresence>
                    <motion.div key="login" variants={loginVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                        <h2 className="text-3xl font-bold text-center">Admin Login</h2>
                        <div className="space-y-4"><input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" /><input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
                        <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center space-x-2"><LogIn size={20} /><span>Login</span></button>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }
    
    const allBookings = Object.entries(bookings).flatMap(([date, dateBookings]) => dateBookings.map(b => ({ ...b, date })));
    
    // Filter the bookings based on the current filter state
    const filteredBookings = allBookings.filter(booking => {
        if (filter === 'All') return true;
        return booking.status === filter.toLowerCase();
    });

    const findClash = (pendingBooking) => { /* ... this function is unchanged ... */ };
    
    const filterButtons = ['All', 'Pending', 'Booked', 'Rejected'];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-4 sm:px-6 py-12 md:py-24">
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard icon={Users} title="Total Bookings" value={allBookings.length} />
                <StatCard icon={Clock} title="Pending Requests" value={allBookings.filter(b => b.status === 'pending').length} />
                <StatCard icon={BarChart2} title="Booked Events" value={allBookings.filter(b => b.status === 'booked').length} />
                <StatCard icon={XCircle} title="Rejected" value={allBookings.filter(b => b.status === 'rejected').length} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
                    <h2 className="text-2xl font-bold">Booking Requests</h2>
                    {/* Filter Buttons */}
                    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                        {filterButtons.map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${filter === status ? 'bg-indigo-600 text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Table Head is the same */}
                        <thead><tr className="border-b dark:border-gray-700"><th className="p-3">Event</th><th className="p-3 hidden lg:table-cell">Requester</th><th className="p-3">Date & Time</th><th className="p-3">Status</th><th className="p-3">Actions</th></tr></thead>
                        <tbody>
                            {/* Use the filteredBookings array to render the table rows */}
                            {filteredBookings.map((b) => {
                                const clash = b.status === 'pending' && findClash(b);
                                return ( <tr key={b.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">{/* ... table cells are unchanged ... */}</tr> );
                            })}
                        </tbody>
                    </table>
                     {filteredBookings.length === 0 && <p className="text-center text-gray-500 py-8">No {filter !== 'All' ? filter.toLowerCase() : ''} bookings found.</p>}
                </div>
            </div>
             <AnimatePresence>{/* ... modal is unchanged ... */}</AnimatePresence>
        </motion.div>
    );
};