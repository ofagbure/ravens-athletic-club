// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const router = require('express').Router();
const db = require("../models");
const moment = require("moment");

// Requiring our custom middleware for checking if a user is logged in
let isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================



// Each of the below routes just handles the HTML page that the user gets sent to.
router.get('/', userAccess);
router.get('/login', loginUser);
router.get('/members', renderMemberPage);
router.get('/tennis', tennisCourtList);
router.get('/pool', poolList);
router.get('/basketball', basketBallList);
router.get('/reserve', reservation);


//user access
// helper for / and blog routes
function userAccess(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members", renderMemberPage);
    // res.render("members");
  }
  res.render('signup');
};



function loginUser(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    console.log("user data profile = ", req)
    res.render("members", renderMemberPage);
  }
  res.render('login');
};



async function renderMemberPage(req, res) {
  // helper for / and blog routes

  if (req.user) {
    db.Player.findOne({
      where: {
        PlayerId: req.user.id
      }
    }).then(function (userData) {

      //get all reserations
      db.Reservation.findAll({
        where: {
          PlayerId: req.user.id
        },
        include: [{
          model: db.Player,
        }],
        limit: 10

      }).then((reservations) => {

        //find all reservation current user has partnered with as a partner 
        db.Reservation.findAll({
          where: {
            PartnerId: req.user.id
          },
          include: [{
            model: db.Player,
          }],
          limit: 10

        }).then((partneredReservations) => {

          //list of all reservations by user
          const reserationsList = reservations.map(reservation => {
            return {
              court: reservation.CourtId,
              start: moment(reservation.start_time).format('LLL'),
              end: moment(reservation.end_time).format('LLL'),
              PlayerId: reservation.PlayerId,
              PlayerName: reservation.PlayerName,
              PartnerName: reservation.PartnerName
            }
          })

//combine the two reservations i.e reservations as main player and reservation as partner
const allReservations = [...reservations, ...partneredReservations];
          //list of users a user is partnered with 
          const partnerReservationList = [];
          allReservations.forEach(reservation => {
            if (reservation.PartnerId !== null) {
              partnerReservationList.push({
                reservationId: reservation.id,
                court: reservation.CourtId,
                startTime: moment(reservation.start_time).format('LLL'),
                end: moment(reservation.end_time).format('LLL'),
                PlayerId: reservation.PlayerId,
                name: `${reservation.Player.first_name} ${reservation.Player.last_name} `,
                PartnerName: reservation.PartnerName,
                skillLevel: reservation.Player.skill_level
              })
            }
          });

          const userProf = {
            ...req.user,
            ...userData.dataValues
          }
          const playerDataRender = {
            user_name: userProf.email,
            member_id: userProf.PlayerId,
            member_since: moment(userProf.createdAt).format('LL'),
            name: `${userProf.first_name} ${userProf.last_name}`,
            need_partner: userProf.need_partner,
            skill_level: userProf.skill_level,
            favorite_activity: userProf.activity,
            reserationsList: reserationsList,
            partnerReservationList: partnerReservationList
          }

          res.render("members", playerDataRender);

        }).catch(err => {
          res.status(401).json(err);
        });


      }).catch(err => {
        res.status(401).json(err);
      });
    }).catch(err => {
      res.status(401).json(err);
    });
  }
}

//get user profile data 
function userProfileData(req) {
  //find specific user 
  db.Player.findOne({
      where: {
        PlayerId: req.user.id
      }
    }).then(function (userData) {
      const userProf = {
        ...req.user,
        ...userData.dataValues
      }
      const playerDataRender = {
        user_name: userProf.email,
        member_id: userProf.PlayerId,
        member_since: moment(userProf.createdAt).format('LL'),
        name: `${userProf.first_name} ${userProf.last_name}`,
        need_partner: userProf.need_partner,
        skill_level: userProf.skill_level,
        favorite_activity: userProf.activity,
      }
      return playerDataRender;
    })
    .catch(err => {
      res.status(401).json(err);
    });
}

//render tennis page
function tennisCourtList(req, res) {

  if (req.user) {
    db.Player.findOne({
      where: {
        PlayerId: req.user.id
      }
    }).then(function (userData) {

      //get all reserations
      db.Reservation.findAll({
        where: {
          PlayerId: req.user.id
        }
      }).then((reservations) => {
        const reserationsList = reservations.map(reservation => {
          return {
            court: reservation.CourtId,
            start: moment(reservation.start_time).format('LLL'),
            end: moment(reservation.end_time).format('LLL'),
            PlayerId: reservation.PlayerId,
            PlayerName: reservation.PlayerName,
            PartnerName: reservation.PartnerName
          }
        })
        console.log("am here")
        //find reservations with partner enabled
        db.Reservation.findAll({
          // where: {
          //   partner: 1,          
          // },
          // include : [Player]
          where: {
            partner: 1,
          },
          include: [{
            model: db.Player,
          }],
          limit: 10

        }).then((partnerRequestListData) => {
          console.log('Player+reservation = ' + JSON.stringify(partnerRequestListData))
          const partnerRequestList = [];
          partnerRequestListData.forEach(partnerRequest => {
            if (partnerRequest.PlayerId !== req.user.id) {
              partnerRequestList.push({
                reservationId: partnerRequest.id,
                court: partnerRequest.CourtId,
                startTime: moment(partnerRequest.start_time).format('LLL'),
                end: moment(partnerRequest.end_time).format('LLL'),
                PlayerId: partnerRequest.PlayerId,
                name: `${partnerRequest.Player.first_name} ${partnerRequest.Player.last_name} `,
                skillLevel: partnerRequest.Player.skill_level
              })
            }
          })

          //get player name and skill level 
          const userProf = {
            ...req.user,
            ...userData.dataValues
          }
          const playerDataRender = {
            user_name: userProf.email,
            member_id: userProf.PlayerId,
            member_since: moment(userProf.createdAt).format('LL'),
            name: `${userProf.first_name} ${userProf.last_name}`,
            need_partner: userProf.need_partner,
            skill_level: userProf.skill_level,
            favorite_activity: userProf.activity,
            reserationsList: reserationsList,
            partnerRequestList: partnerRequestList,
          }
          res.render("tennis", playerDataRender);
        })




      }).catch(err => {
        res.status(401).json(err);
      });



    }).catch(err => {
      res.status(401).json(err);
    });
  }
}


//render tennis page
function poolList(req, res) {
  if (req.user) {
    db.Player.findOne({
      where: {
        PlayerId: req.user.id
      },
      limit: 10
    }).then(function (userData) {

      //get all reserations

      // console.log("reservation api", req)
      db.Reservation.findAll({
        where: {
          PlayerId: req.user.id
        }
      }).then((reservations) => {
        const reserationsList = reservations.map(reservation => {
          return {
            court: reservation.CourtId,
            start: moment(reservation.start_time).format('LLL'),
            end: moment(reservation.end_time).format('LLL'),
            PlayerId: reservation.PlayerId,
            PlayerName: reservation.PlayerName,
            PartnerName: reservation.PartnerName
          }
        })

        const userProf = {
          ...req.user,
          ...userData.dataValues
        }
        const playerDataRender = {
          user_name: userProf.email,
          member_id: userProf.PlayerId,
          member_since: moment(userProf.createdAt).format('LL'),
          name: `${userProf.first_name} ${userProf.last_name}`,
          need_partner: userProf.need_partner,
          skill_level: userProf.skill_level,
          favorite_activity: userProf.activity,
          reserationsList: reserationsList
        }
        res.render("pool", playerDataRender);
      }).catch(err => {
        res.status(401).json(err);
      });



    }).catch(err => {
      res.status(401).json(err);
    });
  }
}

//render tennis page
function basketBallList(req, res) {
  if (req.user) {
    db.Player.findOne({
      where: {
        PlayerId: req.user.id
      },
      limit: 10
    }).then(function (userData) {

      //get all reserations

      // console.log("reservation api", req)
      db.Reservation.findAll({
        where: {
          PlayerId: req.user.id
        }
      }).then((reservations) => {
        const reserationsList = reservations.map(reservation => {
          return {
            court: reservation.CourtId,
            start: moment(reservation.start_time).format('LLL'),
            end: moment(reservation.end_time).format('LLL'),
            PlayerId: reservation.PlayerId,
            PlayerName: reservation.PlayerName,
            PartnerName: reservation.PartnerName
          }
        })

        const userProf = {
          ...req.user,
          ...userData.dataValues
        }
        const playerDataRender = {
          user_name: userProf.email,
          member_id: userProf.PlayerId,
          member_since: moment(userProf.createdAt).format('LL'),
          name: `${userProf.first_name} ${userProf.last_name}`,
          need_partner: userProf.need_partner,
          skill_level: userProf.skill_level,
          favorite_activity: userProf.activity,
          reserationsList: reserationsList
        }
        res.render("basketball", playerDataRender);
      }).catch(err => {
        res.status(401).json(err);
      });



    }).catch(err => {
      res.status(401).json(err);
    });
  }
  // res.render('login');
}

// reservation page
function reservation(req, res) {

  if (req.user) {
    db.Player.findOne({

        PlayerId: req.user.id

      }).then(function (userData) {
        const userProf = {
          ...req.user,
          ...userData.dataValues
        }
        const playerDataRender = {
          user_name: userProf.email,
          member_id: userProf.PlayerId,
          member_since: moment(userProf.createdAt).format('LL'),
          name: `${userProf.first_name} ${userProf.last_name}`,
          need_partner: userProf.need_partner,
          skill_level: userProf.skill_level,
          favorite_activity: userProf.activity,
        }
        res.render("reserve", playerDataRender);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  }
  // res.render('login');
};


function reservationByUser(id) {
  db.Reservation.findAll({
      where: {
        PlayerId: id
      }
    }).then(function (reservation) {
      const userProf = {
        reservation
      }
      const playerDataRender = {
        user_name: userProf.email,
        member_id: userProf.PlayerId,
        member_since: moment(userProf.createdAt).format('LL'),
        name: `${userProf.first_name} ${userProf.last_name}`,
        need_partner: userProf.need_partner,
        skill_level: userProf.skill_level,
        favorite_activity: userProf.activity,
      }
      res.render("reserve", playerDataRender);
    })
    .catch(err => {
      res.status(401).json(err);
    });

  // res.render('login');
};

module.exports = router;