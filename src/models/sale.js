const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  stockNumber: {
    type: Number,
    required: true
  },
  source: {
    type: String
  },
  warranty: {
    type: Boolean
  },
  // Need aditional info to know what type this should be
  // finance: {}
  maintenance: {
    type: Boolean
  },
  customer: {
    type: String,
    required: true,
    trim: true
  },
  vehicle: {
    type: String,
    required: true,
    trim: true
  },
  frontGross: {
    type: Number,
    required: true
  },
  backGross: {
    type: Number,
    required: true
  },
  salesperson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
