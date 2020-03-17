

// Requiring our models and passport as we've configured it
const db = require("../models");
let passport = require("../config/passport");
const express = require('express');
const router = express.Router();


// ADD a new COURT
router.post("/api/court", (req, res) => {
    db.Court.create({
        court_numb: req.body.court_numb,
        address: req.body.address
      })
      .then(function () {

        res.json({
          court_numb: req.body.court_numb
        })
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //GET List of courts
  router.get("/api/court", (req, res) => {
    db.Court.findAll().then(function (court) {
        res.json(court);

      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //search for court
  router.get("/api/court/:id", (req, res) => {
    db.Court.findOne({
        where: {
          id: req.params.id
        }
      }).then(function (court) {
        res.json(court);

      })
      .catch(err => {
        res.status(401).json(err);
      });
  });


  router.post("/api/court", (req, res) => {
    db.Court.create({
        court_numb: req.body.court_numb,
        address: req.body.address
      })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  module.exports = router;