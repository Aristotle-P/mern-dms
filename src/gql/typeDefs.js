const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
  # references custom date scalar in resolvers
  scalar Date

  type Query {
    users: [User!]!
    user(name: String!, password: String!): User!
    sales: [Sale!]!
    sale(id: ID!): Sale!
    me(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    count: Int!
  }

  type Sale {
    id: ID!
    date: Date!
    stockNumber: Int!
    source: String
    warranty: Boolean
    maintenance: Boolean
    customer: String!
    vehicle: String!
    frontGross: Int!
    backGross: Int!
    salesperson: User!
  }

  type LoginObject {
    accessToken: String!
    user: User!
  }

  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): LoginObject!
    createSale(
      date: String!
      stockNumber: Int!
      source: String
      warranty: Boolean
      maintenance: Boolean
      customer: String!
      vehicle: String!
      frontGross: Int!
      backGross: Int!
      salesperson: ID!
    ): Sale!
    invalidateRefreshTokens(id: ID!): Boolean!
  }
`;

module.exports.createApolloSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers,
  });
};
