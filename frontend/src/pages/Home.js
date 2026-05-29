import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoutineBlock from '../components/RoutineBlock';

const API = 'http://localhost:5000/api/routines';

function Home() {
  const [blocks, setBlocks] = useState([]);
  const [form, setForm] = useState({
    title: '', startTime: '', durationMins: '', category: 'General'
  });
  const [showForm, setShowForm] = useState(false);

  const fetchBlocks = async () => {
    const res = await axios.get(API);
    setBlocks(res.data);
  };

  useEffect(() => { fetchBlocks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API, form);
    setForm({ title: '', startTime: '', durationMins: '', category: 'General' });
    setShowForm(false);
    fetchBlocks();
  };

  const handleToggle = async (id) => {
    await axios.patch(`${API}/${id}/toggle`);
    fetchBlocks();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchBlocks();
  };

  const handleEdit = async (id, updatedData) => {
    await axios.put(`${API}/${id}`, updatedData);
    fetchBlocks();
  };

  const completed = blocks.filter(b => b.isCompleted).length;
  const total = blocks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <h1 style={{ marginBottom: '4px' }}>My Daily Routine</h1>
        <p style={{ color: '#888', fontSize: '14px' }}>{new Date().toDateString()}</p>

        {total > 0 && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#666' }}>Today's Progress</span>
              <span style={{ fontSize: '13px', color: '#4f46e5', fontWeight: '600' }}>
                {completed}/{total} done ({percent}%)
              </span>
            </div>
            <div style={{ background: '#e5e7eb', borderRadius: '99px', height: '8px' }}>
              <div style={{
                background: percent === 100 ? '#10b981' : '#4f46e5',
                height: '8px', borderRadius: '99px',
                width: `${percent}%`, transition: 'width 0.4s ease'
              }} />
            </div>
            {percent === 100 && (
              <p style={{ color: '#10b981', fontSize: '13px', marginTop: '8px', fontWeight: '600' }}>
                All done for today!
              </p>
            )}
          </div>
        )}
      </div>

      <button onClick={() => setShowForm(!showForm)} style={{
        background: '#4f46e5', color: '#fff', border: 'none',
        padding: '12px 24px', borderRadius: '10px', fontSize: '14px',
        cursor: 'pointer', width: '100%', marginBottom: '16px',
        fontWeight: '600', letterSpacing: '0.3px'
      }}>
        {showForm ? '✕ Cancel' : '+ Add New Block'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#fff', padding: '20px', borderRadius: '12px',
          marginBottom: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '14px', color: '#1e1b4b' }}>New Routine Block</p>
          <input placeholder="Task title e.g. Morning Workout" value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="time" value={form.startTime}
              onChange={e => setForm({ ...form, startTime: e.target.value })}
              required style={{ ...inputStyle, flex: 1 }} />
            <input type="number" placeholder="Mins" value={form.durationMins}
              onChange={e => setForm({ ...form, durationMins: e.target.value })}
              required style={{ ...inputStyle, flex: 1 }} />
          </div>
          <select value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={inputStyle}>
            <option>General</option>
            <option>Health</option>
            <option>Work</option>
            <option>Rest</option>
            <option>Personal</option>
          </select>
          <button type="submit" style={{
            background: '#4f46e5', color: '#fff', border: 'none',
            padding: '12px', borderRadius: '8px', fontSize: '14px',
            cursor: 'pointer', width: '100%', fontWeight: '600'
          }}>Save Block</button>
        </form>
      )}

      {blocks.map(block => (
        <RoutineBlock key={block._id} block={block}
          onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
      ))}

      {total === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', background: '#fff', borderRadius: '12px' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>📋</p>
          <p style={{ color: '#aaa', fontSize: '14px' }}>No blocks yet. Add your first routine!</p>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px 12px',
  marginBottom: '12px', borderRadius: '8px',
  border: '1px solid #e5e7eb', fontSize: '14px',
  background: '#f9fafb'
};

export default Home;