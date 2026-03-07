const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    memberId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: String,
    email: String,
    address: String,
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
