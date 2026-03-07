const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    type: { type: String, enum: ['Admin Fee', 'AGM Fee', 'Development Fee'], required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fee', feeSchema);
