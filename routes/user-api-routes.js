// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the users
  app.get("/api/users", function(req, res) {
    // var query = {};
    // if (req.query.kid_id) {
    //   query.KidId = req.query.kid_id;
    // }
    // 1. Add a join here to include all of the Users who created these kids
    db.User.findAll({
      // where: query
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // Get route 
  app.get("/api/users/:id", function(req, res) {
    // 2. Add a join here to include the Kids of the User
    // db.User.findAll({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbUser) {
    //   console.log(dbUser);
    //   res.json(dbUser);
    // });
  });

  // POST route 
  app.post("/api/users", function(req, res) {
    // db.User.create(req.body).then(function(dbUser) {
    //   res.json(dbUser);
    // });
  });

  // DELETE route 
  app.delete("/api/users/:id", function(req, res) {
    // db.User.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbUser) {
    //   res.json(dbUser);
    // });
  });

  // PUT route for updating users
  app.put("/api/users", function(req, res) {
    // db.User.update(
    //   req.body,
    //   {
    //     where: {
    //       id: req.body.id
    //     }
    //   }).then(function(dbUser) {
    //   res.json(dbUser);
    // });
  });
};