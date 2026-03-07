const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    paymentMethod: String,
    notes: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Savings', savingsSchema);
