// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header({ isDarkMode, setIsDarkMode, isUserLoggedIn, onLogout, onLoginClick }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/facilities', label: 'Facilities' },
        { to: '/booking', label: 'Booking' },
        { to: '/admin', label: 'Admin' },
    ];

    const NavLinkComponent = ({ to, label }) => (
        <NavLink
            to={to}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => `relative text-lg font-medium tracking-wide transition-colors duration-300 w-full text-left md:w-auto md:text-center px-4 py-2 md:p-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`}
        >
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500"
                            layoutId="underline"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
                </>
            )}
        </NavLink>
    );

    return (
        <header className="sticky top-0 left-0 right-0 z-40 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
            <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <motion.div
                    className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link to="/" className="flex items-center gap-3"> {/* Use flexbox for alignment */}
                        <img src="/logo.png" alt="University Logo" className="h-8 sm:h-10" /> {/* Add the logo */}
                        <div>
                            <span className="hidden sm:inline">Poornima University</span>
                            <span className="sm:hidden">P.U. Booking</span>
                        </div>
                    </Link>
                </motion.div>

                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map(item => <NavLinkComponent key={item.to} {...item} />)}
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <div className="hidden sm:block">
                        {isUserLoggedIn ? (
                            <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">Logout</button>
                        ) : (
                            <button onClick={onLoginClick} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">Login</button>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg overflow-hidden"
                    >
                        <ul className="flex flex-col items-start space-y-2 p-4">
                            {navItems.map(item => <li key={item.to} className="w-full"><NavLinkComponent {...item} /></li>)}
                            <li className="sm:hidden w-full pt-2">
                                {isUserLoggedIn ? (
                                    <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="w-full bg-red-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-600 transition-colors">Logout</button>
                                ) : (
                                    <button onClick={() => { onLoginClick(); setIsMenuOpen(false); }} className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">Login</button>
                                )}
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}