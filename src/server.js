require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const axios = require('axios');
const { createGraphqlMiddleware } = require('express-gql');
const bodyParser = require('body-parser');
const { createApolloSchema } = require('./gql/typeDefs');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');

const { createTokens } = require('./utils/auth');
const User = require('./models/user');

const schema = createApolloSchema();

const app = express();

app.use(cookieParser());

app.use(async (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  const refreshToken = req.cookies['refresh-token'];

  if (!accessToken && !refreshToken) {
    return next();
  }

  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
    return next();
  } catch (error) {
    console.log(error);
  }

  if (!refreshToken) {
    return next();
  }

  try {
    const data = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findOne({ _id: data.userId });

    if (!user || user.count !== data.count) {
      return next();
    }

    const tokens = createTokens(user);

    res.cookie('access-token', tokens.accessToken, { maxAge: 15 * 60 * 1000 });
    res.cookie('refresh-token', tokens.refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    req.userId = user.id;
  } catch (error) {
    console.log(error);
  }

  next();
});

app.post(
  '/graphql',
  bodyParser.json(),
  createGraphqlMiddleware({
    context: ({ req, res }) => ({ req, res }),
    formatError: ({ req, error }) => error,
    schema
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
