import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import ProfileModal from './components/ProfileModal';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [showProfile, setShowProfile] = useState(false);

  const handleAuth = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (!user) return <Login onAuth={handleAuth} />;

  return (
    <div className="app">
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '20px',
        background: '#fff', padding: '14px 20px',
        borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <div
          onClick={() => setShowProfile(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          {user.avatar ? (
            <img src={user.avatar} alt="avatar"
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#4f46e5', color: '#fff', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px'
            }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e1b4b' }}>
              Hi, {user.name}!
            </p>
            <p style={{ fontSize: '12px', color: '#888' }}>Tap to edit profile</p>
          </div>
        </div>
        <button onClick={handleLogout} style={{
          background: 'transparent', border: '1px solid #e5e7eb',
          padding: '8px 16px', borderRadius: '8px',
          fontSize: '13px', cursor: 'pointer', color: '#666'
        }}>Logout</button>
      </div>

      <Home />

      {showProfile && (
        <ProfileModal
          user={user}
          onClose={() => setShowProfile(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}

export default App;