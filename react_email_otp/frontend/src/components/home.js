// Home.js
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const Home = () => {
  const location = useLocation();  // get the current location object.
  const email = location.state && location.state.email; // useLocation hook to access the state passed during routing(from Login.js).

  if (!email) {
    return <Navigate to="/login" state={{ message: 'First get Login' }} />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Welcome, {email}!</h2>
        <p className="text-gray-700">This is your home page.</p>
      </div>
    </div>
  );
};

export default Home;
