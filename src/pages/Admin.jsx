// src/pages/Admin.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BarChart2, Clock, CheckCircle, XCircle, Pencil, LogIn } from 'lucide-react'; // Import Pencil
import StatCard from '../components/StatCard.jsx';
import SuggestionModal from '../components/SuggestionModal.jsx';

export default function Admin({ bookings, handleUpdateBookingStatus }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [suggestionModalData, setSuggestionModalData] = useState(null);

    // This part is the same as before
    if (!isLoggedIn) {
        const loginVariants = { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'backOut' } }, exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } } };
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <AnimatePresence>
                    <motion.div key="login" variants={loginVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
                        <h2 className="text-3xl font-bold text-center">Admin Login</h2>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <button onClick={() => setIsLoggedIn(true)} className="w-full py-3 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
                            <LogIn size={20} /><span>Login</span>
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    const allBookings = Object.entries(bookings).flatMap(([date, dateBookings]) => dateBookings.map(b => ({ ...b, date })));

    const findClash = (pendingBooking) => {
        return allBookings.find(b =>
            b.status === 'booked' &&
            b.id !== pendingBooking.id &&
            b.date === pendingBooking.date &&
            b.hall === pendingBooking.hall &&
            b.startTime < pendingBooking.endTime &&
            b.endTime > pendingBooking.startTime
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 sm:px-6 py-12 md:py-24"
        >
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard icon={Users} title="Total Bookings" value={allBookings.length} />
                <StatCard icon={Clock} title="Pending Requests" value={allBookings.filter(b => b.status === 'pending').length} />
                <StatCard icon={BarChart2} title="Upcoming Events" value={allBookings.filter(b => b.status === 'booked').length} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
                <h2 className="text-2xl font-bold mb-4">Booking Requests</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        {/* Table Head is the same */}
                        <thead>
                            <tr className="border-b dark:border-gray-700">
                                <th className="p-3">Event</th>
                                <th className="p-3 hidden lg:table-cell">Requester</th>
                                <th className="p-3">Date & Time</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBookings.map((b) => {
                                const clash = b.status === 'pending' && findClash(b);
                                return (
                                    <tr key={b.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        {/* Other table cells are the same */}
                                        <td className="p-3 font-semibold">{b.title}<div className="text-xs font-normal text-gray-500">{b.hall}</div>{b.additionalRequirements && <div className="text-xs font-normal text-blue-500 mt-1">Reqs: {b.additionalRequirements}</div>}</td>
                                        <td className="p-3 hidden lg:table-cell">{b.requestedBy}<div className="text-xs text-gray-500">({b.department})</div></td>
                                        <td className="p-3 text-sm">{b.date}<div className="text-xs">{b.startTime}-{b.endTime}</div></td>
                                        <td className="p-3"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${b.status === 'booked' ? 'bg-green-200 text-green-800' : b.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'}`}>{b.status}</span></td>
                                        
                                        {/* --- MODIFIED ACTIONS CELL --- */}
                                        <td className="p-3">
                                            {b.status === 'pending' && (
                                                <div className="flex items-center space-x-1 sm:space-x-2">
                                                    <button title="Approve" onClick={() => handleUpdateBookingStatus(b.date, b.id, 'booked')} className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50" disabled={!!clash}><CheckCircle size={16} /></button>
                                                    <button title="Reject" onClick={() => handleUpdateBookingStatus(b.date, b.id, 'rejected')} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"><XCircle size={16} /></button>
                                                    {/* This button is now always visible for pending requests */}
                                                    <button title="Re-allocate Hall" onClick={() => setSuggestionModalData(b)} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><Pencil size={16} /></button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <AnimatePresence>
                {suggestionModalData && <SuggestionModal booking={suggestionModalData} allBookings={allBookings} onClose={() => setSuggestionModalData(null)} onApproveWithChange={(booking, newHall) => { handleUpdateBookingStatus(booking.date, booking.id, 'booked', newHall); setSuggestionModalData(null); }} />}
            </AnimatePresence>
        </motion.div>
    );
};