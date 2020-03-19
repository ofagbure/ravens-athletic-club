// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main", layoutsDir: 'views/main' }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
const courtController = require("./controllers/court-controller.js");
const reserveController = require("./controllers/reserve-controller.js");
const userController = require("./controllers/user-controller.js");
const userprofileController = require("./controllers/userprofile-controller.js");
const viewController = require("./controllers/view-controller.js");

app.use(courtController);
app.use(reserveController);
app.use(userController);
app.use(userprofileController);
app.use(viewController);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, () => {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});

