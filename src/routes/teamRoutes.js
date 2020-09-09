const express = require('express');
const router = express.Router();

const Team = require('../models/team');

router.get('/team', async (req, res) => {
  try {
    const teams = await Team.find();
    res.send(teams);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get('/team/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id });
    res.send(team);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post('/team', async (req, res) => {
  const { teamName, members } = req.body;
  const team = new Team({ teamName, members });
  await team.save();
  res.send(team);
});

router.put('/team/:id', async (req, res) => {
  try {
    const team = await Team.findOne({ _id: req.params.id });
    if (!team) {
      res.status(404).send('No team found');
    }

    updates = Object.keys(req.body);

    updates.forEach((data) => {
      team[data] = req.body[data];
    });
    await team.save();
    console.log(team);
    res.send(team);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Get specific team by name with regex
router.get('/team/regex/:name', async (req, res) => {
  const name = req.params.name;
  const team = await Team.find({ teamName: { $regex: name, $options: 'i' } });
  res.send(team);
});

module.exports = router;
