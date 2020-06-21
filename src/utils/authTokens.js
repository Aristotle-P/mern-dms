const { sign } = require('jsonwebtoken');

const createAccessToken = (user) => {
  const accessToken = sign(
    { id: user.id, count: user.count },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15m',
    }
  );

  return accessToken;
};
const createRefreshToken = (user) => {
  const refreshToken = sign(
    { id: user.id, count: user.count },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d',
    }
  );

  return refreshToken;
};

module.exports = {
  createAccessToken,
  createRefreshToken,
};
