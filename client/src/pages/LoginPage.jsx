import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/client-home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#fffaf0] to-[#f8f1e4] pt-20 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-[#B9975B] p-12 mx-4">
        <h1 className="text-4xl font-playfair font-semibold text-[#B9975B] mb-6 text-center">
          Login
        </h1>
        <p className="text-center text-gray-600 mb-6 font-lora">
          Enter your credentials to access your dashboard.
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 text-center py-2 rounded mb-4" role="alert">
            {error}
          </p>
        )}

        {isAuthenticated && user && (
          <p className="bg-green-100 text-green-700 text-center py-2 rounded mb-4" role="alert">
            Welcome, {user.name || user.username}!
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-1 font-semibold text-[#B9975B]">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full border border-[#B9975B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9975B]"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-semibold text-[#B9975B]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-[#B9975B] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9975B]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B9975B] text-white font-semibold rounded-full py-3 hover:bg-[#a67c1f] transition-colors duration-300"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
