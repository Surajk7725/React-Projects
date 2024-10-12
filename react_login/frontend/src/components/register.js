import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/auth/register', { name, email, password, confirmPassword }, { withCredentials: true });
        if (res.data.token) {
          navigate('/login');
        }
      } catch (err) {
        setError('User already exists');
      }
    };
  
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl md:max-w-2xl mt-24 mb-24"> {/* Added mb-10 here */}
                <h2 className="text-3xl font-bold mb-3 text-center text-gray-800">Join us</h2>
                <h5 className="text-lg text-gray-600 text-center mb-5">Create your personal account</h5>
                <form onSubmit={handleSubmit} className="space-y-3">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Full Name</label>
                        <input 
                            type="text" 
                            placeholder="Fullname" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Email address</label>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Password</label>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-left text-gray-700 font-medium">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            name="checkbox" 
                            id="checkbox" 
                            required 
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-0"
                        />
                        <span>I agree to all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">terms of service</a>.</span>
                    </div>
                    <div className="flex justify-center"> {/* Centering the button */}
                        <button 
                            type="submit" 
                            className="w-1/2 bg-green-500 text-white py-3 px-2 rounded-md hover:bg-green-600 transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <footer className="mt-4 text-center">
                    <p className="text-gray-600"><Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Register;
