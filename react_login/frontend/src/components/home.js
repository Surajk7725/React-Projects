import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/current_user', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {user ? (
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}</h1>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <h1 className="text-xl font-semibold text-gray-600">Loading...</h1>
      )}
    </div>
  );
};

export default Home;
