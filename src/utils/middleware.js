const { verify } = require('jsonwebtoken');

const isAuth = async (resolve, __, ___, { req, res, next }) => {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new Error('not authenticated');
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.payload = payload;
  } catch (err) {
    console.log(err);
    throw new Error('not authenticated');
  }

  const result = await resolve();

  return result;
};

const middlewareObj = {
  Query: {
    me: isAuth,
  },
};

const middleware = [middlewareObj];

module.exports = middleware;
