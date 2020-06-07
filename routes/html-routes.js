// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // splash page route
  app.get("/", function(req, res) {
    
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  
  // once the user logs in send them to the members page

  app.get("/members", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  // once user clicks on the generate story button redirect to story.html

  app.get("/story", function(req, res) {   
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/story.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

};
