const monk = require("monk");
require('dotenv').config;
const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const db = monk(process.env.MONGO_URI ||'localhost:27017/testing');

module.exports = db;
