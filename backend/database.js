const monk = require("monk");
const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const db = monk(process.env.MONGO_URI);

module.exports = db;
