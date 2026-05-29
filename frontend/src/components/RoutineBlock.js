import React, { useState } from 'react';

const categoryColors = {
  General: '#e5e7eb',
  Health: '#d1fae5',
  Work: '#dbeafe',
  Rest: '#fef3c7',
  Personal: '#ede9fe'
};

function RoutineBlock({ block, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: block.title,
    startTime: block.startTime,
    durationMins: block.durationMins,
    category: block.category
  });

  const handleSave = () => {
    onEdit(block._id, form);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div style={{
        background: '#fff', padding: '16px',
        borderRadius: '10px', marginBottom: '10px',
        border: '2px solid #4f46e5'
      }}>
        <input value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={inputStyle} placeholder="Task title" />
        <input type="time" value={form.startTime}
          onChange={e => setForm({ ...form, startTime: e.target.value })}
          style={inputStyle} />
        <input type="number" value={form.durationMins}
          onChange={e => setForm({ ...form, durationMins: e.target.value })}
          style={inputStyle} placeholder="Duration (mins)" />
        <select value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          style={inputStyle}>
          <option>General</option>
          <option>Health</option>
          <option>Work</option>
          <option>Rest</option>
          <option>Personal</option>
        </select>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleSave} style={actionBtn('#4f46e5')}>Save</button>
          <button onClick={() => setIsEditing(false)} style={actionBtn('#6b7280')}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: categoryColors[block.category] || '#e5e7eb',
      padding: '14px 18px', borderRadius: '10px',
      marginBottom: '10px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      opacity: block.isCompleted ? 0.5 : 1
    }}>
      <div>
        <p style={{ fontWeight: '600', fontSize: '15px',
          textDecoration: block.isCompleted ? 'line-through' : 'none' }}>
          {block.title}
        </p>
        <p style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>
          {block.startTime} • {block.durationMins} mins • {block.category}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onToggle(block._id)} style={actionBtn('#4f46e5')}>
          {block.isCompleted ? 'Undo' : 'Done'}
        </button>
        <button onClick={() => setIsEditing(true)} style={actionBtn('#f59e0b')}>
          Edit
        </button>
        <button onClick={() => onDelete(block._id)} style={actionBtn('#ef4444')}>
          Delete
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px',
  marginBottom: '10px', borderRadius: '8px',
  border: '1px solid #ddd', fontSize: '14px'
};

const actionBtn = (color) => ({
  background: color, color: '#fff', border: 'none',
  padding: '6px 12px', borderRadius: '6px',
  fontSize: '12px', cursor: 'pointer'
});

export default RoutineBlock;