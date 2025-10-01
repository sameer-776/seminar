// src/components/BookingForm.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { SEMINAR_HALLS } from '../data.js';

export default function BookingForm({ currentUser, details, goBack, onSubmit, selectedHall }) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({}); // State to hold validation errors

    const validateForm = (formData) => {
        const newErrors = {};
        if (!formData.get('title').trim()) newErrors.title = "Event title is required.";
        if (parseInt(formData.get('expectedAttendees')) <= 0) newErrors.expectedAttendees = "Attendees must be a positive number.";
        if (!formData.get('purpose').trim()) newErrors.purpose = "Purpose of the event is required.";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (!validateForm(formData)) return; // Stop if validation fails

        const newBooking = {
            id: Date.now(),
            title: formData.get('title'),
            hall: selectedHall, // Use the pre-selected hall
            date: details.date,
            startTime: details.startTime,
            endTime: details.endTime,
            status: 'pending',
            requestedBy: formData.get('organiserName'),
            department: formData.get('department'),
            purpose: formData.get('purpose'),
            expectedAttendees: formData.get('expectedAttendees'),
            additionalRequirements: formData.get('additionalRequirements')
        };
        onSubmit(newBooking);
        setIsSubmitted(true);
    };

    if (isSubmitted) { /* ... this part is unchanged ... */ }
    
    return (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl">
            <button onClick={goBack} className="text-sm mb-4 text-indigo-500 hover:underline">&larr; Back to Availability</button>
            <h2 className="text-3xl font-bold mb-2">Request: {selectedHall}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Booking for: <span className="font-semibold text-indigo-500">{details.date} from {details.startTime} to {details.endTime}</span></p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <input name="title" type="text" required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Expected No. of Attendees</label>
                    <input name="expectedAttendees" type="number" required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.expectedAttendees ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} />
                    {errors.expectedAttendees && <p className="text-red-500 text-xs mt-1">{errors.expectedAttendees}</p>}
                </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">Purpose</label>
                    <textarea name="purpose" required className={`w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 ${errors.purpose ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}></textarea>
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                </div>
                 {/* Organiser, Department, and Requirements fields are unchanged... */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <button type="submit" className="w-full mt-4 py-3 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700">Submit Request</button>
                </motion.div>
            </form>
        </motion.div>
    );
};