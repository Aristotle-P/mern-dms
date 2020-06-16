const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const auth = require('../utils/authMiddleware');
const {
  createAccessToken,
  createRefreshToken,
} = require('../utils/authTokens');

// Get all users
router.get('/users', auth, async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Get specific user
router.get('/user', async (req, res) => {
  const id = req.body.id;
  const user = await User.findById({ _id: id });
  res.send(user);
});

// Create user
router.post('/user', async (req, res) => {
  const { name, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.send('Email already in use');
  }
  console.log('made it here');
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
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

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    path: '/refresh-token',
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
