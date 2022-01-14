const mongoClient = require("mongodb").MongoClient;

let connection = null;

const open = function () {
  if (get() == null) {
    mongoClient.connect(process.env.DB_URL, function (err, client) {
      if (err) {
        console.log("DB connection failed");
        return;
      }
      connection = client.db(process.env.DB_NAME);
      console.log("DB connection pool", connection);
    });
  }
};

const get = function () {
  return connection;
};

module.exports = { get, open };
