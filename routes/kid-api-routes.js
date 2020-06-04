// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the kids
  app.get("/api/kids", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    
    db.Kid.findAll({
      where: query
    }).then(function(dbKid) {
      res.json(dbKid);
    });
  });

  // Get route for retrieving a single kid
  app.get("/api/kids/:id", function(req, res) {
    db.Kids.findAll({
      where: {
        id: req.params.id
      }
    }).then(function(dbKid) {
      console.log(dbKid);
      res.json(dbKid);
    });
  });

  // POST route for saving a new user
  app.post("/api/users", function(req, res) {
    db.user.create(req.body).then(function(dbKid) {
      res.json(dbKid);
    });
  });

  // DELETE route for deleting kids
  app.delete("/api/kids/:id", function(req, res) {
    db.Kid.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbKid) {
      res.json(dbKid);
    });
  });

  // PUT route for updating kids
  app.put("/api/kids", function(req, res) {
    db.Kid.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbKid) {
      res.json(dbKid);
    });
  });
};