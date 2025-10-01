// src/components/PublicSeminarsList.jsx
import React from 'react'; 
import { motion } from 'framer-motion';
import { initialSeminars } from '../data';

export default function PublicSeminarsList() {
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } } };
    return (
        <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" animate="visible">
                {initialSeminars.map(seminar => (
                    <motion.div key={seminar.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col" variants={itemVariants}>
                        <h3 className="text-2xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">{seminar.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{seminar.date} | {seminar.hall}</p>
                        <p className="flex-grow mb-4 text-gray-700 dark:text-gray-300">{seminar.description}</p>
                        <div className="flex justify-between items-center mt-auto">
                            <span className="font-semibold text-sm">Capacity: {seminar.capacity}</span>
                            <button className="bg-gray-400 text-white font-bold py-2 px-4 rounded-md cursor-not-allowed">Details</button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
};