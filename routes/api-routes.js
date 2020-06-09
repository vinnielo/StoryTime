// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const sendStory = require("./nodemailer-routes")

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

  app.post("/api/kid", function(req, res) {
    console.log(req.user)
    db.User.findAll({
      where:{
        email: req.user.email
      }
    }).then(function(data){
      console.log(data[0].dataValues)
      let data2 = {
        name: req.body.name,
        pet: req.body.pet,
        sibling: req.body.sibling,
        guardian: req.body.guardian,
        guardian1: req.body.guardian1,
        toy: req.body.toy,
        UserId: data[0].dataValues.id
      }
      db.Kid.create(data2)
      .then(function() {
        console.log(data2)
        // res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err)
        res.status(401).json(err);
      });  
    })
  });

  
  app.get("/api/kid", function(req,res) {
    console.log("this is working", res)
    db.Kid.findAll({}).then(function(dbKid) {
      res.json(dbKid);
    });
  });

 
  // user api get route
  app.get("/api/signup", function(req,res){
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  })



  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.post('/send',function(req,res){
    sendStory(req.body.to)
    res.response("Way to not screw it up")
  });


      // DELETE route for deleting kids
  app.delete("/api/kid/:id", function(req, res) {
    console.log(req.params.id);
    db.Kid.destroy({
       where: {
         id: req.params.id
       }
     }).then(function(dbKid) {
       res.json(dbKid);
     });
   });




  
};

