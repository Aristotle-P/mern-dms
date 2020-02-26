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

const schema = createApolloSchema();

const app = express();

app.use(cookieParser());

app.use((req, _, next) => {
  const accessToken = req.cookies['access-token'];

  try {
    const data = verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = data.userId;
    return next();
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
