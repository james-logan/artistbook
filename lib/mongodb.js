var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

if (!global.db) {
  mongo.connect(url, function(err, db) {
    global.db = db;
  });
}
