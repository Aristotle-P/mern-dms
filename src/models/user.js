const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Valid email required');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot include the word "password"');
      }
    },
  },
  count: {
    type: Number,
    default: 0,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual('sales', {
  ref: 'Sale',
  localField: '_id',
  foreignField: 'salesperson',
});

userSchema.virtual('pds', {
  ref: 'pds',
  localField: '_id',
  foreignField: 'salesperson',
});

const User = mongoose.model('User', userSchema);

module.exports = User;
