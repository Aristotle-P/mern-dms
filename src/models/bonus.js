const mongoose = require('mongoose');

const bonusSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true
  },
  showroomEntires: {
    type: Boolean,
    default: false,
  },
  googleReviews: {
    type: Number,
    default: 0,
  },
  surveys: {
    type: Boolean,
    default: false,
  },
  financeDeals: {
    type: Number,
    deafult: 0,
  },
  warranties: {
    type: Number,
    default: 0,
  },
  maintenance: {
    type: Number,
    default: 0,
  },
  insurance: {
    type: Number,
    default: 0,
  },
  salesperson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Bonus = mongoose.model('Bonus', bonusSchema);

module.exports = Bonus;
