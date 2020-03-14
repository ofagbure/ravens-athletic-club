// Requiring our models and passport as we've configured it
const db = require("../models");
let passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        //
        db.Player.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          need_partner: req.body.need_partner,
          skill_level: req.body.skill_level,
          activity: req.body.activity,
          courtId: req.body.courtId
        })
          .then(function() {
            
            res.redirect(307, "/api/login");
          })
          .catch(err => {
            res.status(401).json(err);
          });
        //
      //  res.json(res);
        // res.redirect(307, "/api/login");
      })
      .catch(err => {
       
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea

      res.json({
        email: req.user.email,
        id: req.user.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        need_partner: req.body.need_partner,
        skill_level: req.body.skill_level,
        activity: req.body.activity,
        courtId: req.body.courtId
      });
    }
  });

// ADD a new COURT
  app.post("/api/court", (req, res) => {
    db.Court.create({
      court_numb: req.body.court_numb,
      address: req.body.address
    })
      .then(function() {
        res.redirect(307, "/api/court/:id");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });
  //GET List of courts
  app.get("/api/court", (req, res) => {
    db.Court.findAll().then(function(court) {
      res.json(court);
      // res.redirect(307, "/api/login");
    })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  //search for court
  app.get("/api/court/:id", (req, res) => {
    db.Court.findOne({
      where: 
       { 
         id: req.params.id
       }
    }).then(function(court) {
      //res.json(court);
       res.redirect(307, "/api/court/:id");
    })
      .catch(err => {
        res.status(401).json(err);
      });
  });


  app.post("/api/court", (req, res) => {
    db.Court.create({
      court_numb: req.body.court_numb,
      address: req.body.address
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

//create a user profile
app.post("/api/userProfile", (req, res) => {
  db.Player.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    need_partner: req.body.need_partner,
    skill_level: req.body.skill_level,
    activity: req.body.activity,
    courtId: req.body.courtId
  })
    .then(function() {
      
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

//get all userprofile
app.get("/api/userProfile", (req, res)=>{
  db.Player.findAll().then((userProf)=>{
    res.send(userProf)
  }).catch(err => {
    res.status(401).json(err);
  });
})

//get specific userprofile

  app.get("/api/userProfile/:id", (req, res) => {
    console.log(" req.params.id = "+ req.params.id)
    db.Player.findOne({
      where: 
       { 
         id: req.params.id
       }
    }).then(function(userProf) {
      res.json(userProf);
      // res.redirect(307, "/api/login");
    })
      .catch(err => {
        res.status(401).json(err);
      });
  });


  //update userprofile
  app.put("/api/userProfile/:id", (req, res) => {

    db.Player.update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      need_partner: req.body.need_partner,
      activity: req.body.activity,
      courtId: req.body.courtId
    },{
      where: 
       { 
         id: req.params.id
       }
    }).then(function(userProf) {
      res.json(userProf);
      // res.redirect(307, "/api/login");
    })
      .catch(err => {
        res.status(401).json(err);
      });
  });


  //delete user profile
  app.delete("/api/userProfile/:id", (req, res) => {
    console.log(" req.params.id = "+ req.params.id)
    db.Player.destroy({
      where: 
       { 
         id: req.params.id
       }
    }).then(function(userProf) {
      res.json(userProf);
      // res.redirect(307, "/api/login");
    })
      .catch(err => {
        res.status(401).json(err);
      });
  });


};
