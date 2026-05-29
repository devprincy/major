const express = require('express');
const router = express.Router();
const RoutineBlock = require('../models/RoutineBlock');

// Get all blocks
router.get('/', async (req, res) => {
  const blocks = await RoutineBlock.find().sort({ startTime: 1 });
  res.json(blocks);
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

// Mark complete / incomplete
router.patch('/:id/toggle', async (req, res) => {
  const block = await RoutineBlock.findById(req.params.id);
  block.isCompleted = !block.isCompleted;
  await block.save();
  res.json(block);
});

// Delete a block
router.delete('/:id', async (req, res) => {
  await RoutineBlock.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;