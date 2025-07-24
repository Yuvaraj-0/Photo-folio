import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice'; // your auth slice action
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('http://localhost:3002/api/auth/admin/login', formData);

      // Save token to localStorage (optional but recommended)
      localStorage.setItem('token', response.data.token);

      // Dispatch login success to Redux store with user data
      dispatch(loginSuccess({
        ...response.data.user,
        name: 'admin',
        role: 'admin'
      }));
      

      alert('Admin logged in successfully!');

      // Redirect to admin dashboard (change route as needed)
      navigate('/');
     

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <input
        type="email"
        name="email"
        placeholder="Admin Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem' }}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{ padding: '0.5rem' }}
      />
      <button type="submit" disabled={loading} style={{ padding: '0.5rem', cursor: 'pointer' }}>
        {loading ? 'Logging in...' : 'Login as Admin'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

    </form>
  );
}
