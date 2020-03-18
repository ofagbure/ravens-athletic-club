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
router.get('/members', members);
router.get('/tennis', tennisCourtList);
router.get('/pool', poolList);
router.get('/basketball', basketBallList);
router.get('/reserve', reservation);


// router.get('/blog', renderBlog);
// router.get('/', renderBlog);

// cms route loads cms.html
router.get("/cms", function (req, res) {
  res.render('cms');
});

router.get("/authors", function (req, res) {
  res.render('authors');
});


// // helper for / and blog routes
// function renderBlog(req, res) {
//   var query = {};
//   if (req.query.author_id) {
//     query.AuthorId = req.query.author_id;
//   }
//   db.Post.findAll({
//     where: query,
//     include: [db.Author]
//   }).then(function (posts) {
//     res.render('blog', { posts: posts })
//   });
// }



//user access
// helper for / and blog routes
function userAccess(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members");
  }
  res.render('signup');
};


// helper for / and blog routes
function loginUser(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.render("members");
  }
  res.render('login');
};


// helper for / and blog routes
function members (req, res) {
  if (req.user) {
    res.render("members");
  } 

};

//render tennis page
function tennisCourtList (req, res) {
  if (req.user) {
    res.render("tennis");
  }
  // res.render('login');
}

//render tennis page
function poolList (req, res) {
  if (req.user) {
    res.render("pool");
  }
  // res.render('login');
}

//render tennis page
function basketBallList (req, res) {
  if (req.user) {
    res.render("basketball");
  }
  // res.render('login');
}
// reservation page
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
function reservation (req, res) {

  if (req.user) {
    res.render('reserve');
  }
  // res.render('login');
};

module.exports = router;