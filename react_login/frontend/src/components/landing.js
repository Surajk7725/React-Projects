import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <header className="h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">Login / Register Page</h1>
            <p className="text-lg text-center text-gray-600 mb-8">Join us now and don't waste time</p>
            <div className="flex space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">
                        Log In
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600">
                        <span>Register</span>
                    </button>
                </Link>
            </div>
        </header>
    );
}
