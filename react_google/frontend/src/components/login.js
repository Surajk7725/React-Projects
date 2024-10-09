import React from 'react';
import backgroundImage from '../images/76.jpg';

function Login() {
  const googleAuth = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>
        <div className="form">
          <form className='space-y-4'>
            <input 
              type="text" 
              placeholder="Username" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-500 text-white font-bold rounded hover:bg-green-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <button 
            className="w-full mt-6 py-3 bg-white border border-gray-300 rounded flex items-center justify-center space-x-3 shadow hover:shadow-lg transition duration-300" 
            onClick={googleAuth}
          >
            <img 
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=" 
              alt="Google logo" 
              className="w-6 h-6" 
            />
            <span className="text-gray-600 font-medium">Sign In With Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
