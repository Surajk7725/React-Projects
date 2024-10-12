import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
        if (res.data.token) {
          navigate('/home');
        }
      } catch (err) {
        setError('Invalid Credentials');
      }
    };
  
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign in to us</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
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
                        <div className="flex justify-between items-center">
                            <label className="block text-left text-gray-700 font-medium">Password</label>
                            <Link to="/forget-password" className="text-blue-500 hover:underline text-sm">Forget password?</Link>
                        </div>
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
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <footer className="mt-6 text-center">
                    <p className="text-gray-600">First time? <Link to="/register" className="text-blue-500 hover:underline">Create an account</Link>.</p>
                    <p className="text-gray-600"><Link to="/" className="text-blue-500 hover:underline">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
