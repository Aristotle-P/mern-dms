const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User!]!
    user(id: ID!): User!
    sales: [Sale!]!
    sale(id: ID!): Sale!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
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

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
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
  }
`;

module.exports.createApolloSchema = () => {
  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
};
