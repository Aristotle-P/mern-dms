const { verify } = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    res.status(401).send('not authenticated');
    next();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).send('not authenticated');
    next();
  }
};

module.exports = isAuth;
