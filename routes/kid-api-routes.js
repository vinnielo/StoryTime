// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the kids
  app.get("/api/kids", function(req, res) {
    // var query = {};
    // if (req.query.guardian_id) {
    //   query.GuardianId = req.query.guardian_id;
    // }
    // 1. Add a join here to include all of the Authors to these posts
    db.Kid.findAll({
      // where: query
    }).then(function(dbKid) {
      res.json(dbKid);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/kids/:id", function(req, res) {
    // 2. Add a join here to include the Guardians of the Kid
    // db.Kid.findAll({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbKid) {
    //   console.log(dbKid);
    //   res.json(dbKid);
    // });
  });

  // POST route for saving a new post
  app.post("/api/kids", function(req, res) {
    // db.Kid.create(req.body).then(function(dbKid) {
    //   res.json(dbKid);
    // });
  });

  // DELETE route for deleting kids (BRUTAL)
  app.delete("/api/kids/:id", function(req, res) {
    // db.Kid.destroy({
    //   where: {
    //     id: req.params.id
    //   }
    // }).then(function(dbKid) {
    //   res.json(dbKid);
    // });
  });

  // PUT route for updating kids
  app.put("/api/kids", function(req, res) {
    // db.Kid.update(
    //   req.body,
    //   {
    //     where: {
    //       id: req.body.id
    //     }
    //   }).then(function(dbKid) {
    //   res.json(dbKid);
    // });
  });
};