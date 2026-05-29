import React, { useState, useRef } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

function ProfileModal({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [preview, setPreview] = useState(user.avatar || '');
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API}/profile`,
        { name, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUser = { ...res.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onUpdate(updatedUser);
      onClose();
    } catch (err) {
      alert('Failed to update profile');
    }
    setSaving(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: '16px',
        padding: '28px', width: '100%', maxWidth: '360px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#1e1b4b' }}>Edit Profile</h2>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div onClick={() => fileRef.current.click()} style={{ cursor: 'pointer', display: 'inline-block' }}>
            {preview ? (
              <img src={preview} alt="avatar"
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4f46e5' }} />
            ) : (
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: '#4f46e5', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', fontWeight: '700', margin: '0 auto',
                border: '3px dashed #a5b4fc', cursor: 'pointer'
              }}>
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <p style={{ fontSize: '12px', color: '#4f46e5', marginTop: '6px' }}>
              Click to change photo
            </p>
          </div>
          <input type="file" accept="image/*" ref={fileRef}
            onChange={handleImageChange} style={{ display: 'none' }} />
        </div>

        <label style={{ fontSize: '13px', color: '#666', display: 'block', marginBottom: '6px' }}>
          Display Name
        </label>
        <input value={name} onChange={e => setName(e.target.value)}
          style={{
            width: '100%', padding: '10px 12px', borderRadius: '8px',
            border: '1px solid #e5e7eb', fontSize: '14px',
            marginBottom: '20px', background: '#f9fafb'
          }} />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', borderRadius: '8px',
            border: '1px solid #e5e7eb', background: '#fff',
            fontSize: '14px', cursor: 'pointer', color: '#666'
          }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{
            flex: 1, padding: '10px', borderRadius: '8px',
            border: 'none', background: '#4f46e5',
            fontSize: '14px', cursor: 'pointer', color: '#fff',
            fontWeight: '600'
          }}>{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;