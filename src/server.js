require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');
const cors = require('cors');

const { createAccessToken, createRefreshToken } = require('./utils/authTokens');
const User = require('./models/user');
const userRoutes = require('./routes/userRoutes');
const saleRoutes = require('./routes/saleRoutes');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.post('/refresh-token', async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    return res.send({ ok: false, accessToken: '' });
  }

  let payload;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return res.send({ ok: false, accessToken: '' });
  }
  const user = await User.findOne({ _id: payload.id });

  if (!user) {
    return res.send({ ok: false, accessToken: '' });
  }

  if (user.count !== payload.count) {
    return res.send({ ok: false, accessToken: '' });
  }

  const date = new Date();
  date.setDate(date.getDate() + 7);

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
    expires: date,
  });

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

app.use(userRoutes);
app.use(saleRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
