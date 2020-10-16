const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const helmet = require("helmet");
const passport = require("passport");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./backend/database");
const fs = require("fs");
const register = require("./backend/register");
const multer = require("multer");
const path = require("path");
const { Console } = require("console");

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('SocMedApp/rant-app/build'));
}
//==================File Upload Setup=================//
const dir = "./SocMedApp/rant-app/src/pictures-uploads";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.substr(0,file.originalname.length-4)
    cb(
      null,
      filename+ "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage }).single("picture");
//=============MIDDLEWARES===============//
require("./backend/passport-config")(passport);
app.use(cookieParser("secretcode"));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());

//==============ROUTES==================//
app.use("/register", register);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) console.log(err);

    if (!user) res.json({ authenticated: false });
    else {
      req.login(user, (error) => {
        if (error) console.log(error);

        res.json({ data: user, authenticated: true });
      });
    }
  })(req, res, next);
});
      //Check the user if it's still logged in
app.get("/islogin", (req, res) => {
  if (req.user != null || req.user != undefined)
    res.send({ data: req.user, authenticated: true });
  else {
    res.send({ data: null, authenticated: false });
  }
});
    //Break the login session
app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

  //Edit Profile route
app.use('/profile',require('./backend/profile')(db,upload,fs))

  //Newsfeed APIS
const newsfeed = require('./backend/newsfeed');
app.use('/newsfeed',newsfeed)
app.get('/searchuser/:username',(req,res)=>{
  const {username} = req.params;
  db.get('userinformation').findOne({username:username})
  .then(result=>res.json(result))
  .catch(err => res.send({error:err}))
})
app.listen(port, () => console.log(`PORT IS RUNNING ON ${port}`));
