const express = require('express');
const router = express.Router();

const Bonus = require('../models/bonus');

router.get('/bonuses/:id', async (req, res) => {
  try {
    const bonus = await Bonus.find({ salesperson: req.params.id });
    res.send(bonus);
  } catch (err) {
    res.status(404).send(err);
  }
})

router.post('/bonuses', async (req, res) => {
  const {
    showroomEntires,
    googleReviews,
    surveys,
    financeDeals,
    warranties,
    maintenance,
    insurance,
    salesperson,
  } = req.body;
  const month = new Date().getMonth();

  try {
    const bonus = new Bonus({
      showroomEntires,
      googleReviews,
      surveys,
      financeDeals,
      warranties,
      maintenance,
      insurance,
      salesperson,
      month
    })
    await bonus.save();
    res.send(bonus);
  } catch (err) {
    res.status(500).send(err);
  }
})

module.exports = router;