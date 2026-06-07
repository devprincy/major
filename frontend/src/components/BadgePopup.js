import React, { useEffect, useState } from 'react';

const badgeLabels = {
  first_step: '🥇 First Step',
  on_fire: '🔥 On Fire',
  consistency_king: '👑 Consistency King',
  xp_hunter: '⚡ XP Hunter',
  legend: '🏆 Legend'
};

function BadgePopup({ badges, onClose }) {
  const [visible, setVisible] = useState(true);

 useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '30px', right: '30px',
      background: '#1e1b4b', color: '#fff',
      padding: '16px 20px', borderRadius: '12px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 9999, animation: 'slideIn 0.3s ease'
    }}>
      <p style={{ fontWeight: '700', marginBottom: '8px', fontSize: '14px' }}>
        🎉 New Badge Unlocked!
      </p>
      {badges.map(b => (
        <p key={b} style={{ fontSize: '16px', fontWeight: '600' }}>
          {badgeLabels[b] || b}
        </p>
      ))}
    </div>
  );
}

export default BadgePopup;