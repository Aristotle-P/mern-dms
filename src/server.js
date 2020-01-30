require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const { createGraphqlMiddleware } = require('express-gql');
const bodyParser = require('body-parser');
const { createApolloSchema } = require('./gql/typeDefs');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const schema = createApolloSchema();

const app = express();

app.get('/sales/:id', (req, res) => {
  try {
    const sale = sale.findOne({ id: req.params.id });

    if (!sale) {
      return res.status(404).send();
    }
    console.log(sale);
    res.send(sale);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post(
  '/graphql',
  bodyParser.json(),
  createGraphqlMiddleware({
    context: ({ req, res }) => ({}),
    formatError: ({ req, error }) => error,
    schema
  })
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
