const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");


// This section will help you create a new record for the User.
// CHANGE BACK TO POST FROM GET
recordRoutes.route("/record/User").post(function (req, response) {
    
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      password: req.body.password,
      
    };
    db_connect.collection("UserInfo").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  
// This section will help you create a new record for Liked.
recordRoutes.route("/record/Liked").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      password: req.body.password,
    };
    db_connect.collection("Liked").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

// This section will help you create a new record for Disliked
recordRoutes.route("/record/Disliked").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      password: req.body.password,
    };
    db_connect.collection("Disliked").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

// This section will help you create a new record for Filter
recordRoutes.route("/record/Filter").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      password: req.body.password,
    };
    db_connect.collection("Filter").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });


// This section will help you get all records of Liked for user
recordRoutes.route("/find/Liked/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username };
  db_connect
      .collection("Liked")
      .find(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you get all records of Disliked
recordRoutes.route("/find/Disliked/:username").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { username: req.params.username };
    db_connect
        .collection("Disliked")
        .find(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you get all records of Filters
recordRoutes.route("/find/Filters/:username").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { username: req.params.username };
    db_connect
        .collection("Filter")
        .find(myquery, function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you find UserInfo 
recordRoutes.route("/find/UserInfo/:username").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { username: req.params.username };
    db_connect
        .collection("UserInfo")
        .find(myquery).toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you delete a record of User
recordRoutes.route("/delete/user/:username").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { username: req.params.username };
    db_connect.collection("UserInfo").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.status(obj);
    });
  });

  module.exports = recordRoutes;

/*
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  let newvalues = {
    $set: {
      person_name: req.body.person_name,
      person_position: req.body.person_position,
      person_level: req.body.person_level,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});
*/
