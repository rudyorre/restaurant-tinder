const { MongoClient } = require("mongodb");
const Db = "mongodb+srv://CS35L:vOvq6tpjm9h2UMay@web-app.tmo7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const DBclient = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    DBclient.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("Restaurant-Tinder");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};