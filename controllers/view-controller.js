// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const router = require('express').Router();
const db = require("../models");

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


// helper for / and blog routes
function loginUser(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    console.log("user data profile = ", req)
    res.render("members", renderMemberPage);
  }
  res.render('login');
};


// helper for / and blog routes
async function renderMemberPage(req, res) {
  // helper for / and blog routes

  if (req.user) {
     db.Player.findOne({
      
          UserId: req.user.id

      }).then(function (userData) {
        const userProf ={
          ...req.user,
          ...userData.dataValues
        }
        const playerDataRender = {
          user_name: userProf.email,
          member_id: userProf.UserId,
          member_since: userProf.createdAt,
           name : `${userProf.first_name} ${userProf.last_name}`,
          need_partner: userProf.need_partner,
          skill_level: userProf.skill_level,
          favorite_activity: userProf.activity,
        }
        res.render("members", playerDataRender);
      })
      .catch(err => {
        res.status(401).json(err);
      });
  }



};


//get user profile data 
function userProfileData (req){
  db.Player.findOne({
      
    UserId: req.user.id

}).then(function (userData) {
  const userProf ={
    ...req.user,
    ...userData.dataValues
  }
  const playerDataRender = {
    user_name: userProf.email,
    member_id: userProf.UserId,
    member_since: userProf.createdAt,
     name : `${userProf.first_name} ${userProf.last_name}`,
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
       
           UserId: req.user.id
 
       }).then(function (userData) {
         const userProf ={
           ...req.user,
           ...userData.dataValues
         }
         const playerDataRender = {
           user_name: userProf.email,
           member_id: userProf.UserId,
           member_since: userProf.createdAt,
            name : `${userProf.first_name} ${userProf.last_name}`,
           need_partner: userProf.need_partner,
           skill_level: userProf.skill_level,
           favorite_activity: userProf.activity,
         }
         res.render("tennis", playerDataRender);
       })
       .catch(err => {
         res.status(401).json(err);
       });
   }
  }


//render tennis page
function poolList(req, res) {
  if (req.user) {
    db.Player.findOne({
     
         UserId: req.user.id

     }).then(function (userData) {
       const userProf ={
         ...req.user,
         ...userData.dataValues
       }
       const playerDataRender = {
         user_name: userProf.email,
         member_id: userProf.UserId,
         member_since: userProf.createdAt,
          name : `${userProf.first_name} ${userProf.last_name}`,
         need_partner: userProf.need_partner,
         skill_level: userProf.skill_level,
         favorite_activity: userProf.activity,
       }
       res.render("pool", playerDataRender);
     })
     .catch(err => {
       res.status(401).json(err);
     });
 }
}

//render tennis page
function basketBallList(req, res) {
  if (req.user) {
    db.Player.findOne({
     
         UserId: req.user.id

     }).then(function (userData) {
       const userProf ={
         ...req.user,
         ...userData.dataValues
       }
       const playerDataRender = {
         user_name: userProf.email,
         member_id: userProf.UserId,
         member_since: userProf.createdAt,
          name : `${userProf.first_name} ${userProf.last_name}`,
         need_partner: userProf.need_partner,
         skill_level: userProf.skill_level,
         favorite_activity: userProf.activity,
       }
       res.render("basketbaLL", playerDataRender);
     })
     .catch(err => {
       res.status(401).json(err);
     });
 }
  // res.render('login');
}
// reservation page
// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
function reservation(req, res) {

  if (req.user) {
    db.Player.findOne({
     
         UserId: req.user.id

     }).then(function (userData) {
       const userProf ={
         ...req.user,
         ...userData.dataValues
       }
       const playerDataRender = {
         user_name: userProf.email,
         member_id: userProf.UserId,
         member_since: userProf.createdAt,
          name : `${userProf.first_name} ${userProf.last_name}`,
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

module.exports = router;