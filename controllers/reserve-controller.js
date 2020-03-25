// Requiring our models and passport as we've configured it
const db = require("../models");
let passport = require("../config/passport");
const express = require('express');
const router = express.Router();


//create a reservation
router.post("/api/reserve", (req, res) => {
  console.log(" reserve CALL BODY  = ", req.body)
  db.Reservation.create({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      partner: req.body.partner,
      CourtId: parseInt(req.body.CourtId),
      PlayerId: parseInt(req.body.PlayerId)
    })
    .then(function () {

      res.status(201);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

//update a reservation
router.post("/api/reserve/update", (req, res) => {
  db.Reservation.update({
    PartnerId: parseInt(req.body.PartnerId),
      partner : req.body.partner,
      PartnerName: req.body.PartnerName
    }, {
      where: {
        id: parseInt(req.body.reservationId)
      }
    }).then(function () {

      res.status(201);
    })
    .catch(err => {
      res.status(401).json(err);
    });







})

module.exports = router;