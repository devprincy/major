import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';

const API = `${process.env.REACT_APP_API_URL}/api/routines`;

function AnalyticsChart({ isPremium, onUpgrade }) {
  const [history, setHistory] = useState([]);
  const [view, setView] = useState('bar');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      const last30 = res.data.slice(-30).map(item => ({
        date: item.date.slice(5),
        count: item.count
      }));
      setHistory(last30);
    } catch (err) {
      console.log('History error', err);
    }
  };

  if (!isPremium) {
    return (
      <div style={{
        background: '#fff', borderRadius: '12px',
        padding: '24px', marginBottom: '20px',
        textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <p style={{ fontSize: '24px', marginBottom: '8px' }}>📊</p>
        <p style={{ fontWeight: '600', color: '#1e1b4b', marginBottom: '4px' }}>Analytics — Pro Feature</p>
        <p style={{ color: '#888', fontSize: '13px', marginBottom: '16px' }}>
          Upgrade to see your 30-day activity chart
        </p>
        <button onClick={onUpgrade} style={{
          background: '#4f46e5', color: '#fff', border: 'none',
          padding: '8px 20px', borderRadius: '8px',
          fontSize: '13px', cursor: 'pointer', fontWeight: '600'
        }}>Upgrade to Pro</button>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div style={{
        background: '#fff', borderRadius: '12px',
        padding: '24px', marginBottom: '20px',
        textAlign: 'center', color: '#aaa', fontSize: '14px'
      }}>
        📊 No history yet. Complete some blocks to see your analytics!
      </div>
    );
  }

  return (
    <div style={{
      background: '#fff', borderRadius: '12px',
      padding: '20px', marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1b4b' }}>
          📊 Last 30 Days Activity
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setView('bar')} style={{
            padding: '4px 12px', borderRadius: '6px', fontSize: '12px',
            cursor: 'pointer', border: 'none',
            background: view === 'bar' ? '#4f46e5' : '#e5e7eb',
            color: view === 'bar' ? '#fff' : '#666'
          }}>Bar</button>
          <button onClick={() => setView('line')} style={{
            padding: '4px 12px', borderRadius: '6px', fontSize: '12px',
            cursor: 'pointer', border: 'none',
            background: view === 'line' ? '#4f46e5' : '#e5e7eb',
            color: view === 'line' ? '#fff' : '#666'
          }}>Line</button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        {view === 'bar' ? (
          <BarChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Completions" />
          </BarChart>
        ) : (
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} dot={{ r: 3 }} name="Completions" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;