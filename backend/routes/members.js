const express = require('express');
const Member = require('../models/Member');

const router = express.Router();

router.get('/', async (req, res) => {
  const { search = '', status } = req.query;
  const query = {
    ...(status ? { status } : {}),
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { memberId: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ]
  };
  const members = await Member.find(query).sort({ createdAt: -1 });
  res.json(members);
});

router.post('/', async (req, res) => {
  const member = await Member.create(req.body);
  res.status(201).json(member);
});

router.get('/:id', async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json(member);
});

router.put('/:id', async (req, res) => {
  const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json(member);
});

router.delete('/:id', async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.status(204).end();
});

module.exports = router;
