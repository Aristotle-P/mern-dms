const User = require('../models/user');
const Sale = require('../models/sale');

const resolvers = {
  Query: {
    users: () => User.find(),
    sales: () => {
      Sale.find({ salesperson: req.user._id });
    }
  },
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
      await sale.save();
      return sale;
    }
  }
};

module.exports = resolvers;
