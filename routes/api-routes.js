// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function({body}, res) {
    console.log(body)
    db.User.create(body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });  
  });

  app.post("/api/kid", function({body}, res) {
    console.log(body)
    db.Kid.create(body)
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });  
  });

  // user api get route
  app.get("/api/signup", function(req,res){
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  })

  // kids api route

  app.get("/api/kid", function(req,res){
    db.Kid.findAll({}).then(function(dbKid) {
      res.json(dbKid);
    });
  })

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the kids that were created by the user
      db.Kid.findAll({}).then(function(dbKid) {
        res.json(dbKid);
      });
    }
  });

  app.get("/api/user_data/:id", function(req, res) {
    // 2; Add a join to include all of the Author's Posts here
    db.User.findOne({
      where: {
        id: req.params.id,
        include: [db.Kid]
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
};