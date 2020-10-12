const db = require("../database");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      db.get("userinformation")
        .findOne({ username: username })
        .then((doc) => {
          if (!doc) return done(null, false);
          else {
            bcrypt.compare(password, doc.password, (err, result) => {
              if (err) console.log("COMPARE ERROR: ", err);
              if (result) {
                return done(null, doc);
              } else {
                return done(null, false);
              }
            });
          }
        });
    })
  );
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(function (id, done) {
    db.get("userinformation")
      .find({ _id: id })
      .then((doc) => done(null, doc));
  });
};
