import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/routines';

function Heatmap({ isPremium, onUpgrade }) {
  const [history, setHistory] = useState({});

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      const map = {};
      res.data.forEach(item => {
        map[item.date] = item.count;
      });
      setHistory(map);
    } catch (err) {
      console.log('Heatmap error', err);
    }
  };

  const getDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 104; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().split('T')[0];
      days.push({ date: key, count: history[key] || 0 });
    }
    return days;
  };

  const getColor = (count) => {
    if (count === 0) return '#e5e7eb';
    if (count === 1) return '#c4b5fd';
    if (count === 2) return '#8b5cf6';
    if (count >= 3) return '#4f46e5';
    return '#e5e7eb';
  };

  if (!isPremium) {
    return (
      <div style={{
        background: '#fff', borderRadius: '12px',
        padding: '24px', marginBottom: '20px',
        textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <p style={{ fontSize: '24px', marginBottom: '8px' }}>🗓️</p>
        <p style={{ fontWeight: '600', color: '#1e1b4b', marginBottom: '4px' }}>Heatmap — Pro Feature</p>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '16px' }}>
          Upgrade to see your activity heatmap
        </p>
        <button onClick={onUpgrade} style={{
          background: '#4f46e5', color: '#fff', border: 'none',
          padding: '8px 20px', borderRadius: '8px',
          fontSize: '13px', cursor: 'pointer', fontWeight: '600'
        }}>Upgrade to Pro</button>
      </div>
    );
  }

  const days = getDays();
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      padding: '20px', marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1b4b', marginBottom: '16px' }}>
        🗓️ Activity Heatmap
      </h2>

      <div style={{ display: 'flex', gap: '3px', overflowX: 'auto' }}>
        {weeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={`${day.date}: ${day.count} completions`}
                style={{
                  width: '14px', height: '14px',
                  borderRadius: '3px',
                  background: getColor(day.count),
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
        <span style={{ fontSize: '11px', color: '#888' }}>Less</span>
        {['#e5e7eb', '#c4b5fd', '#8b5cf6', '#4f46e5'].map((color, i) => (
          <div key={i} style={{
            width: '14px', height: '14px',
            borderRadius: '3px', background: color
          }} />
        ))}
        <span style={{ fontSize: '11px', color: '#888' }}>More</span>
      </div>
    </div>
  );
}

export default Heatmap;