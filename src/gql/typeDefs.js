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
    me: User
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
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
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
