const express = require('express');
const router = express.Router();
const RoutineBlock = require('../models/RoutineBlock');
const User = require('../models/User');
const {
  calculateStreak, calculateXP,
  isCompletedToday, checkBadges
} = require('../utils/gamification');

// Get all blocks
router.get('/', async (req, res) => {
  const blocks = await RoutineBlock.find().sort({ startTime: 1 });
  res.json(blocks);
});

// Get completion history for charts
router.get('/history', async (req, res) => {
  try {
    const blocks = await RoutineBlock.find();
    const history = {};

    blocks.forEach(block => {
      block.completionHistory.forEach(date => {
        const day = new Date(date).toISOString().split('T')[0];
        history[day] = (history[day] || 0) + 1;
      });
    });

    const result = Object.entries(history).map(([date, count]) => ({ date, count }));
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a block
router.post('/', async (req, res) => {
  const block = new RoutineBlock(req.body);
  await block.save();
  res.json(block);
});

// Update a block
router.put('/:id', async (req, res) => {
  const block = await RoutineBlock.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  );
  res.json(block);
});

// Toggle complete with streak + badge logic
router.patch('/:id/toggle', async (req, res) => {
  const block = await RoutineBlock.findById(req.params.id);
  let newBadges = [];

  if (!block.isCompleted) {
    if (!isCompletedToday(block.lastCompletedDate)) {
      block.streak = calculateStreak(block.lastCompletedDate, block.streak);
      block.lastCompletedDate = new Date();
      block.completionHistory.push(new Date());

      const xpGained = calculateXP(block.streak);
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        user.xp += xpGained;

        // Check for new badges
        newBadges = checkBadges(user.badges, user.xp, block.streak);
        if (newBadges.length > 0) {
          user.badges = [...user.badges, ...newBadges];
        }
        await user.save();
      }
    }
    block.isCompleted = true;
  } else {
    block.isCompleted = false;
  }

  await block.save();
  res.json({ block, newBadges });
});

// Delete a block
router.delete('/:id', async (req, res) => {
  await RoutineBlock.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;