import React, { useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

function Login({ onAuth }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isRegister ? '/register' : '/login';
      const res = await axios.post(`${API}${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onAuth(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginBottom: '6px' }}>{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          {isRegister ? 'Sign up to start your routine' : 'Login to your routine'}
        </p>

        {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input placeholder="Your name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required style={inputStyle} />
          )}
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required style={inputStyle} />
          <input type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required style={inputStyle} />
          <button type="submit" style={btnStyle}>
            {isRegister ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '16px', color: '#666' }}>
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <span onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#4f46e5', cursor: 'pointer', marginLeft: '4px' }}>
            {isRegister ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px',
  marginBottom: '12px', borderRadius: '8px',
  border: '1px solid #ddd', fontSize: '14px'
};

const btnStyle = {
  background: '#4f46e5', color: '#fff', border: 'none',
  padding: '12px', borderRadius: '8px',
  fontSize: '14px', cursor: 'pointer', width: '100%'
};

export default Login;