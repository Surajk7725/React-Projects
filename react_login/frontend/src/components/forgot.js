import React from 'react';
import { Link } from 'react-router-dom';

export default function Forgot() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Reset your password</h2>
                <h5 className="text-gray-600 text-center mb-6">Enter your email address and we will send you a new password</h5>
                
                <form action="/login" className="space-y-4">
                    <div>
                        <label id="reset_pass_lbl" className="block text-left font-medium text-gray-700 mb-2">Email address</label>
                        <input 
                            type="email" 
                            name="email" 
                            required 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <button 
                            id="sub_btn" 
                            type="submit" 
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Send password reset email
                        </button>
                    </div>
                </form>

                <footer className="mt-6 text-center">
                    <p className="text-gray-600">First time? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link>.</p>
                    <p className="text-gray-600 mt-2"><Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    );
}
