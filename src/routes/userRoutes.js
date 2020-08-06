const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const isAuth = require('../utils/authMiddleware');
const {
  createAccessToken,
  createRefreshToken,
} = require('../utils/authTokens');

// Get all users
router.get('/users', isAuth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Get specific user
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById({ _id: id });
  res.send(user);
});

// Create user
router.post('/user', async (req, res) => {
  const { name, email, onlineSales, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.send('Email already in use');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, onlineSales, password: hashedPassword });
  await user.save();
  res.send(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send('This email does not have a user associated with it');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(404).send('Password incorrect');
  }

  const date = new Date();
  date.setDate(date.getDate() + 7);

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    expires: date,
  });

  res.send({ accessToken: createAccessToken(user), user });
});

// Not sure how I want to implement
// token invalidation just yet
// invalidateRefreshTokens: async (_, { id }) => {
//   await User.findOneAndUpdate({ _id: id }, { $inc: { count: 1 } });

//   return true;
// },

module.exports = router;
