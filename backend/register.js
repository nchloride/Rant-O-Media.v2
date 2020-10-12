const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const db = require("./database");
router.post("/", async (req, res) => {
  const { username, fullname, address, email } = req.body;
  const password = await bcryptjs.hash(req.body.password, 10);
  db.get("userinformation")
    .findOne({ username: req.body.username, email: req.body.email })
    .then((doc) => {
      console.log("doc logger: ", doc);
      if (!doc) {
        db.get("userinformation").insert({
          username,
          fullname,
          address,
          email,
          password,
        });
        res.json({ message: "YOU'VE CREATED AN ACCOUNT CUNT!" });
      } else {
        res.json({ message: "USERNAME IS ALREADY TAKEN IM SORRY GAMER" });
      }
    });
});

module.exports = router;
