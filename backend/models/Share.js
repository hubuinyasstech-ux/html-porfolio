const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema(
  {
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Share', shareSchema);
