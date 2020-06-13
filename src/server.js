require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const { createGraphqlMiddleware } = require('express-gql');
const { applyMiddleware } = require('graphql-middleware');
const bodyParser = require('body-parser');
const { createApolloSchema } = require('./gql/typeDefs');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const cookieParser = require('cookie-parser');
const { verify } = require('jsonwebtoken');

const { createAccessToken, createRefreshToken } = require('./utils/auth');
const User = require('./models/user');
const middleware = require('./utils/middleware');

const schema = createApolloSchema();
const schemaWithMiddleware = applyMiddleware(schema, ...middleware);

const app = express();

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

  res.cookie('jid', createRefreshToken(user), {
    httpOnly: true,
  });

  return res.send({ ok: true, accessToken: createAccessToken(user) });
});

app.post(
  '/graphql',
  bodyParser.json(),
  createGraphqlMiddleware({
    context: ({ req, res, next }) => ({ req, res, next }),
    formatError: ({ req, error }) => error,
    schema: schemaWithMiddleware,
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
