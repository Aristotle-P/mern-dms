const { sign } = require('jsonwebtoken');

const createTokens = user => {
  const accessToken = sign(
    { userId: user.id, count: user.count },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '15min'
    }
  );

  const refreshToken = sign(
    { userId: user.id, count: user.count },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  );

  return { accessToken, refreshToken };
};

module.exports = {
  createTokens
};
