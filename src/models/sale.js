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
  finance: {
    type: Boolean
  },
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
    type: Number
  },
  backGross: {
    type: Number
  },
  salesperson: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
