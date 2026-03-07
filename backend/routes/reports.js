const express = require('express');
const Savings = require('../models/Savings');
const Loan = require('../models/Loan');
const Share = require('../models/Share');
const Fee = require('../models/Fee');

const router = express.Router();

router.get('/', async (req, res) => {
  const { start, end, memberId } = req.query;

  const dateFilter = start || end
    ? { date: { ...(start ? { $gte: new Date(start) } : {}), ...(end ? { $lte: new Date(end) } : {}) } }
    : {};

  const memberFilter = memberId ? { memberId } : {};
  const filter = { ...dateFilter, ...memberFilter };

  const [savings, loans, shares, fees] = await Promise.all([
    Savings.find(filter),
    Loan.find(filter),
    Share.find(filter),
    Fee.find(filter)
  ]);

  const sum = (arr, key = 'amount') => arr.reduce((acc, item) => acc + (item[key] || 0), 0);

  res.json({
    totals: {
      savings: sum(savings),
      loans: sum(loans, 'balance'),
      shares: sum(shares),
      fees: sum(fees)
    },
    records: { savings, loans, shares, fees }
  });
});

module.exports = router;
