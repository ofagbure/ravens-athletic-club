

// Requiring our models and passport as we've configured it
const db = require("../models");
let passport = require("../config/passport");
const express = require('express');
const router = express.Router();


//create a user profile
router.post("/api/reserve", (req, res) => {
  console.log(" reserve CALL BODY  = ", req.body)
  db.Reservation.create({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      CourtId: parseInt(req.body.court_numb),
      PlayerId: parseInt(req.body.player_id)
    })
    .then(function () {
 
      res.status(201);
  //    res.redirect(307, "/api/reserve");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

  module.exports = router;
