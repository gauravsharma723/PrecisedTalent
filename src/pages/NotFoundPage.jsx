import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => (
    <motion.div
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
    >
        <h1 className="text-5xl font-bold text-blue-700 mb-4">404</h1>
        <p className="text-xl mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Go Home</Link>
    </motion.div>
);

export default NotFoundPage;
