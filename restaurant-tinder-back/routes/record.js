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

      //Chirp is the default avatar
      avatar: 1,
      
    };
    db_connect.collection("UserInfo").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });

  //Edit the user's profile -- for the Avatar
  recordRoutes.route("/update/UserInfo/:username").post(function (req, response) {
    
    let db_connect = dbo.getDb();
    let myquery = {username: req.body.username};
    let newvalues = {
      //Update with new avatar
      $set : {avatar: req.body.avatar},
    };
  
    db_connect.collection("UserInfo").updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
  });

// This section will help you create a new record for Filter
recordRoutes.route("/record/Filter").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      location: req.body.location,
      term: req.body.term,
      categories: req.body.categories,
      price: req.body.price,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      radius: req.body.radius,
      username: req.body.username,
    };
    db_connect.collection("Filter").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });
 
// This section will help you get all records of Liked or Disliked
recordRoutes.route("/find/status/:username/:status").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { 
      username: req.params.username,
      status: req.params.status,
     };
    db_connect
        .collection("LikeOrDislike")
        .find(myquery).toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you get all records of Filters
recordRoutes.route("/find/Filters/:username").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = {
      username: req.params.username,
    };
    db_connect
        .collection("Filter")
        .find(myquery).toArray(function (err, result) {
          if (err) throw err;
          const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
          }
          shuffleArray(result);
          res.json(result);
        });
  });

// This section will help you check if user exists
recordRoutes.route("/find/User/:username").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { username: req.params.username };
    db_connect
        .collection("UserInfo")
        .find(myquery).toArray(function (err, result) {
          if (err) throw err;
          res.json(result);
        });
  });

// This section will help you check if username and password is valid
recordRoutes.route("/find/UserInfo/:username/:password").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { 
    username: req.params.username,
    password: req.params.password, 
  };
  db_connect
      .collection("UserInfo")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});

// This section will help you create/update like and dislike
recordRoutes.route("/update").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.body.username, alias: req.body.alias};
  let newvalues = {
    $set: {
      username: req.body.username,
      status: req.body.status,
      alias: req.body.alias,
      name: req.body.name,
      address: req.body.address,
      order: req.body.order,
      image: req.body.image
    },
  };
  db_connect
    .collection("LikeOrDislike")
    .updateOne(myquery, newvalues, {upsert: true}, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});


module.exports = recordRoutes;

/* not used
// This section will help you create a new record for Liked.
recordRoutes.route("/record/Liked").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      username: req.body.username,
      alias: req.body.alias,
      name: req.body.name,
      address: req.body.address
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
      Disliked: req.body.Disliked,
    };
    db_connect.collection("Disliked").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  });
*/

/* not implemented yet
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
*/

 
/* not used
// This section will help you get all records of Liked for user
recordRoutes.route("/find/Liked/:username").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { username: req.params.username };
  db_connect
      .collection("Liked")
      .find(myquery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
*/
