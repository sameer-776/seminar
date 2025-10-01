// src/components/AvailabilityChecker.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// TimeSlots sub-component is mostly unchanged, but now filters by hall
const TimeSlots = ({ date, bookingsForDate, onSelect, onBack, selectedHall }) => {
    // ... logic for slots and time changes remains the same ...
    const isSlotBooked = (slot) => {
        return bookingsForDate.some(b => b.hall === selectedHall && b.startTime <= slot && b.endTime > slot && b.status !== 'rejected');
    };
    // JSX for TimeSlots is also unchanged
};

export default function AvailabilityChecker({ bookings, onSlotSelect, selectedHall, goBack }) {
    const [date, setDate] = useState(new Date(2025, 9, 1));
    const [selectedDate, setSelectedDate] = useState(null);
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth());
    const days = [...Array(daysInMonth).keys()];
    const blanks = [...Array(firstDayOfMonth).keys()];
    const formatDate = (d) => d.toISOString().split('T')[0];

    // --- LOGIC FOR DAY COLORING ---
    const getDayStatus = (dayDate) => {
        const bookingsOnDay = bookings[formatDate(dayDate)]?.filter(b => b.hall === selectedHall && b.status !== 'rejected') || [];
        if (bookingsOnDay.length === 0) {
            return 'bg-green-100 dark:bg-green-900/50 hover:bg-green-200'; // Available
        }
        const hasPending = bookingsOnDay.some(b => b.status === 'pending');
        if (hasPending) {
            return 'bg-yellow-100 dark:bg-yellow-900/50 hover:bg-yellow-200'; // Pending
        }
        return 'bg-red-100 dark:bg-red-900/50 hover:bg-red-200 cursor-not-allowed'; // Booked
    };

    return (
        <motion.div key="calendar-view" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} >
            <button onClick={goBack} className="text-sm mb-4 text-indigo-500 hover:underline">&larr; Change Hall</button>
            <h2 className="text-3xl font-bold text-center mb-6">Check Availability for <span className="text-indigo-500">{selectedHall}</span></h2>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-xl">
                    <div className="flex justify-between items-center mb-4">{/* ... Month navigation is unchanged ... */}</div>
                    <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <div key={i} className="font-semibold text-xs sm:text-sm">{day}</div>)}
                        {blanks.map(b => <div key={`b-${b}`}></div>)}
                        {days.map(day => {
                            const dayDate = new Date(date.getFullYear(), date.getMonth(), day + 1);
                            const dayStatusClass = getDayStatus(dayDate);
                            const isSelected = selectedDate && formatDate(dayDate) === formatDate(selectedDate);
                            return (
                                <div key={day} onClick={() => setSelectedDate(dayDate)} 
                                    className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${isSelected ? 'ring-2 ring-indigo-500' : ''} ${dayStatusClass}`}>
                                    {day + 1}
                                </div>
                            );
                        })}
                    </div>
                </div>
                {selectedDate && <TimeSlots date={selectedDate} bookingsForDate={bookings[formatDate(selectedDate)] || []} onSelect={onSlotSelect} onBack={() => setSelectedDate(null)} selectedHall={selectedHall} />}
            </div>
        </motion.div>
    );
};