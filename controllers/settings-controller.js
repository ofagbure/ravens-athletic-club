// Requiring our models and passport as we've configured it
const db = require("../models");
let passport = require("../config/passport");
const express = require('express');
const router = express.Router();
//create a user profile
router.post("/api/userProfile", (req, res) => {

    //get all userprofile
    router.get("/api/userProfile", (req, res) => {
        db.Player.findAll().then((userProf) => {
            console.log("user profile data ");
            res.json(userProf)
        }).catch(err => {
            res.status(401).json(err);
        });
    })

    //get specific userprofile
    router.get("/api/userProfile/:id", (req, res) => {

        db.Player.findOne({
                where: {
                    id: req.params.id
                }
            }).then(function (userProf) {
                res.json(userProf);
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });


    //update userprofile
    router.put("/api/userProfile/:id", (req, res) => {

        db.Player.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                need_partner: req.body.need_partner,
                activity: req.body.activity,
                courtId: req.body.courtId
            }, {
                where: {
                    id: req.params.id
                }
            }).then(function (userProf) {
                res.json(userProf);
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });


    //delete user profile
    router.delete("/api/userProfile/:id", (req, res) => {
        console.log(" req.params.id = " + req.params.id)
        db.Player.destroy({
                where: {
                    id: req.params.id
                }
            }).then(function (userProf) {
                res.json(userProf);
            })
            .catch(err => {
                res.status(401).json(err);
            });
    });

})
module.exports = router;