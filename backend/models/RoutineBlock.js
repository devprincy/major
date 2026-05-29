const mongoose = require('mongoose');

const RoutineBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  durationMins: { type: Number, required: true },
  category: { type: String, default: 'General' },
  repeat: { type: String, default: 'daily' },
  isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('RoutineBlock', RoutineBlockSchema);