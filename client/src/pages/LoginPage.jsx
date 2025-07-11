import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // send login API call here
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Login</button>
      </form>
      <p style={{ marginTop: 10 }}>
        Don’t have an account?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => navigate('/register')}
        >
          Create Account
        </span>
      </p>
    </div>
  );
}
