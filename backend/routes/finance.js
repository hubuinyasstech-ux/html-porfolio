const express = require('express');
const Savings = require('../models/Savings');
const Loan = require('../models/Loan');
const Share = require('../models/Share');
const Fee = require('../models/Fee');

const router = express.Router();

const crud = (Model) => {
  const sub = express.Router();

  sub.get('/', async (req, res) => {
    const data = await Model.find(req.query).populate('memberId', 'memberId name').sort({ date: -1, createdAt: -1 });
    res.json(data);
  });

  sub.post('/', async (req, res) => {
    const data = await Model.create(req.body);
    res.status(201).json(data);
  });

  sub.put('/:id', async (req, res) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!data) return res.status(404).json({ message: 'Record not found' });
    res.json(data);
  });

  sub.delete('/:id', async (req, res) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ message: 'Record not found' });
    res.status(204).end();
  });

  return sub;
};

router.use('/savings', crud(Savings));
router.use('/loans', crud(Loan));
router.use('/shares', crud(Share));
router.use('/fees', crud(Fee));

module.exports = router;
