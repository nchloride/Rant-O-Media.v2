const monk = require("monk");
const mongo = require("mongodb").MongoClient;
const objectId = require("mongodb").ObjectID;
const db = monk("mongodb+srv://carlo_123:Wh2ldzBvCyFsokNM@cluster0.yigkf.mongodb.net/testing?retryWrites=true&w=majority" ||'localhost:27017/testing');

module.exports = db;
