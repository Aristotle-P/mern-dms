const express = require('express');
const router = express.Router();

const Sale = require('../models/sale');

// Get all sales
router.get('/sales/:id', async (req, res) => {
  try {
    const sales = await Sale.find({ salesperson: req.params.id });
    res.send(sales);
  } catch (err) {
    console.error(err);
    res.status(404).send('No sales found');
  }
});

// Get specific sale
router.get('/sale', async (req, res) => {
  const id = req.body.id;
  try {
    const sale = await Sale.findById({ _id: id });
    res.send(sale);
  } catch (err) {
    console.error(err);
    res.status(404).send('No sales found.');
  }
});

// Create sale
router.post('/sale', async (req, res) => {
  const {
    stockNumber,
    source,
    warranty,
    maintenance,
    customer,
    vehicle,
    frontGross,
    backGross,
    salesperson,
  } = req.body;
  const date = new Date(req.body.date);
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
    salesperson,
  });
  await sale.save();
  res.send(sale);
});

module.exports = router;
