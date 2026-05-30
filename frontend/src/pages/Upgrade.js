import React from 'react';

function Upgrade({ onUpgrade, onClose }) {
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
        padding: '32px', width: '100%', maxWidth: '380px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>⭐</p>
        <h2 style={{ color: '#1e1b4b', marginBottom: '8px' }}>Upgrade to Pro</h2>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
          Unlock advanced analytics, heatmap, and unlimited insights
        </p>

        <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '16px', marginBottom: '24px', textAlign: 'left' }}>
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '8px' }}>✅ Activity Heatmap</p>
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '8px' }}>✅ 30-day Analytics Chart</p>
          <p style={{ fontSize: '13px', color: '#333', marginBottom: '8px' }}>✅ Unlimited Routine Blocks</p>
          <p style={{ fontSize: '13px', color: '#333' }}>✅ CSV Data Export</p>
        </div>

        <button onClick={onUpgrade} style={{
          background: '#4f46e5', color: '#fff', border: 'none',
          padding: '14px', borderRadius: '10px', fontSize: '15px',
          cursor: 'pointer', width: '100%', fontWeight: '700',
          marginBottom: '10px'
        }}>
          Upgrade Now — $4.99/mo
        </button>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none',
          fontSize: '13px', color: '#888', cursor: 'pointer'
        }}>
          Maybe later
        </button>
      </div>
    </div>
  );
}

export default Upgrade;