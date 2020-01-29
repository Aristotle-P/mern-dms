const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const User = require('../models/user');
const Sale = require('../models/sale');

const resolvers = {
  Query: {
    users: () => User.find(),
    user: (_, { id }) => {
      const user = User.findOne({ _id: id });
      return user;
    },
    sales: () => {
      const sale = Sale.find();
      if (!sale) {
        throw Error('No sales found');
      }
      return sale;
    },
    sale: (_, { id }) => {
      const sale = Sale.findOne({ _id: id });
      if (!sale) {
        throw Error('No sale found');
      }
      return sale;
    }
  },
  Sale: {
    async user(parent) {
      const sale = await User.find({ _id: parent.id });
      return sale;
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toDateString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  }),
  Mutation: {
    createUser: async (_, { name, email, password }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
    createSale: async (
      _,
      {
        date,
        stockNumber,
        source,
        warranty,
        maintenance,
        customer,
        vehicle,
        frontGross,
        backGross,
        salesperson
      }
    ) => {
      const sale = new Sale({
        date,
        stockNumber,
        source,
        warranty,
        maintenance,
        customer,
        vehicle,
        frontGross,
        backGross,
        salesperson
      });
      // sale.markModified('dueDate');
      await sale.save();
      return sale;
    }
  }
};

module.exports = resolvers;
