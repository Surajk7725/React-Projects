import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);  // Indicate OTP sent
  const [resendTimer, setResendTimer] = useState(30);  // Countdown for resend OTP
  const [disableResend, setDisableResend] = useState(true);  // Disable resend button initially
  const navigate = useNavigate();  // Direct Routing to another page.

  // Timer effect for OTP resend
  useEffect(() => {
    if (disableResend && resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timerId); // Cleanup interval on unmount
    } else {
      setDisableResend(false);
    }
  }, [resendTimer, disableResend]);

  // Function to send OTP to email
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      console.log(response.data);  // Debugging line
      setShowOtpInput(true);
      setOtpSent(true);
      setResendTimer(30);  // Reset resend timer
      setDisableResend(true);  // Disable resend button after sending OTP
    } catch (error) {
      console.error('Error sending OTP', error);
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      console.log(response.data);  // Debugging line

      // Navigate to home page with email displayed
      navigate('/home', { state: { email } });
    } catch (error) {
      console.error('Error verifying OTP', error);
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to resend OTP
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/send-otp', { email });
      console.log(response.data);  // Debugging line
      setResendTimer(30);  // Reset the timer
      setDisableResend(true);  // Disable the button
    } catch (error) {
      console.error('Error resending OTP', error);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={showOtpInput ? handleVerifyOTP : handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={loading}
            />
          </div>

          {showOtpInput && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={loading}
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className={`text-sm text-blue-600 ${disableResend ? 'cursor-not-allowed' : 'hover:underline'}`}
                  onClick={handleResendOTP}
                  disabled={disableResend || loading}
                >
                  {disableResend ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                </button>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? 'Loading...' : showOtpInput ? 'Verify OTP' : 'Send OTP'}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {otpSent && !loading && !error && (
          <p className="text-green-500 text-center mt-4">OTP has been sent to your email!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
