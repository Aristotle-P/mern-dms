const mongoose = require('mongoose');

const pdsSchema = new mongoose.Schema({
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
});

const pds = mongoose.model('pds', pdsSchema);

module.exports = pds;
