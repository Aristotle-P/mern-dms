const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Sale = require('../models/sale');

const resolvers = {
  Query: {
    users: () => User.find(),

    user: (_, { name }) => {
      const user = User.findOne({ name: name });
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
  // triggers when salesperson is queried from the above sale query
  Sale: {
    salesperson(sale) {
      salesperson = User.findOne({ _id: sale.salesperson });
      return salesperson;
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
    register: async (_, { name, email, password }) => {
      const foundUser = await User.findOne({ email });
      if (foundUser) throw new Error('Email already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      return user;
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('This email does not have a user associated with it');
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Password incorrect');
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
      await sale.save();
      return sale;
    }
  }
};

module.exports = resolvers;
