// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the guardians
  app.get("/api/guardians", function(req, res) {
    var query = {};
    if (req.query.kid_id) {
      query.KidId = req.query.kid_id;
    }
    // 1. Add a join here to include all of the Kids to these posts
    db.Guardian.findAll({
      where: query
    }).then(function(dbGuardian) {
      res.json(dbGuardian);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/guardians/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Guardian.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbGuardian) {
      console.log(dbGuardian);
      res.json(dbGuardian);
    });
  });

  // POST route for saving a new post
  app.post("/api/guardians", function(req, res) {
    db.Guardian.create(req.body).then(function(dbGuardian) {
      res.json(dbGuardian);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/guardians/:id", function(req, res) {
    db.Guardian.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGuardian) {
      res.json(dbGuardian);
    });
  });

  // PUT route for updating posts
  app.put("/api/guardians", function(req, res) {
    db.Guardian.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbGuardian) {
      res.json(dbGuardian);
    });
  });
};