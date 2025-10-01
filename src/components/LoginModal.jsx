// src/components/LoginModal.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function LoginModal({ onClose, onLoginSuccess }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Faculty Login</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><X size={20} /></button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLoginSuccess({ name: e.target.email.value.split('@')[0], department: "Computer Science" }); }}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input name="email" type="email" required placeholder="your.name@university.edu" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" required className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button type="submit" className="w-full py-3 mt-2 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">Sign In</button>
                </form>
            </motion.div>
        </motion.div>
    );
};