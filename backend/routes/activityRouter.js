const express = require("express");
const router = express.Router();
const createDB = require("../config/db");
const Activity = require("../models/Activity");

createDB.sync().then(() => {
  console.log("DB is running");
});

router.post("/activities", async (req, res) => {
  try {
    const { body } = req.body;

    return res.status(201).send(`Hi`);
  } catch (err) {
    console.log(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = router;


