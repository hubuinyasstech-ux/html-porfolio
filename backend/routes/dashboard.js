const express = require('express');
const Member = require('../models/Member');
const Savings = require('../models/Savings');
const Loan = require('../models/Loan');
const Share = require('../models/Share');
const Fee = require('../models/Fee');

const router = express.Router();

const aggregateSum = async (Model, field = 'amount') => {
  const [result] = await Model.aggregate([{ $group: { _id: null, total: { $sum: `$${field}` } } }]);
  return result?.total || 0;
};

router.get('/stats', async (_req, res) => {
  const [totalMembers, totalSavings, totalLoans, totalShares, totalFees] = await Promise.all([
    Member.countDocuments(),
    aggregateSum(Savings),
    aggregateSum(Loan, 'balance'),
    aggregateSum(Share),
    aggregateSum(Fee)
  ]);

  res.json({ totalMembers, totalSavings, totalLoans, totalShares, totalFees });
});

module.exports = router;
