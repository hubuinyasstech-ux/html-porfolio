const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    amount: { type: Number, required: true },
    interest: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    dueDate: Date,
    balance: { type: Number, required: true },
    status: { type: String, enum: ['Active', 'Paid'], default: 'Active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);
