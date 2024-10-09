import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  
import backgroundImage from '../images/76.jpg';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch current user information
    axios.get('http://localhost:5000/auth/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleLogout = () => {
    // Trigger the logout on the backend
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then(() => {
        // After successful logout, redirect to login page
        navigate('/login');
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {user ? (
        <div className="bg-white shadow-lg rounded-lg p-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.displayName}!</h1>
          <p className="text-lg text-gray-600 mb-4">Email: {user.email}</p>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
      )}
    </div>
  );
};

export default Home;
