const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  used: {
    type: Boolean,
    required: true,
  },
  half: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  stockNumber: {
    type: String,
    required: true,
  },
  warranty: {
    type: Boolean,
    default: false,
  },
  finance: {
    type: Boolean,
    default: false,
  },
  maintenance: {
    type: Boolean,
    default: false,
  },
  customer: {
    type: String,
    required: true,
    trim: true,
  },
  vehicle: {
    type: String,
    required: true,
    trim: true,
  },
  frontGross: {
    type: Number,
  },
  backGross: {
    type: Number,
  },
  salesperson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
