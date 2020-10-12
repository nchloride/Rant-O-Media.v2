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
const port = 5000;
const db = require("./backend/database");
const fs = require("fs");
const register = require("./backend/register");
const multer = require("multer");
const path = require("path");
const { Console } = require("console");
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
app.post('/post',(req,res)=>{
  const {post,username,feeling,date,fullname}= req.body;
  db.get('userposts').insert(req.body)
  res.send({message:'Posted!'})
})
app.get('/api/userposts',(req,res)=>{
  db.get('userposts').find({}).then(result=>{
    res.json(result)
  });
})
app.put('/likepost',(req,res)=>{
  const {local_id,username,fullname} = req.body;
  let likeStatus;
  const checkLikes = (likes)=>{
 
    if( likes !==null || likes.length!==0){
      //insert or delete
      const hasLiked = likes.filter(user=> user.username===username)
      if(hasLiked.length!==0){
        likes = likes.filter(user=> user.username !==username)
        likeStatus="Unliked"
      }
      else{
        likes = [...likes,{username,fullname}];
        likeStatus="Liked"
      }
    }
    else{
      likes = [{username,fullname}];
      likeStatus="Liked"
    }

    return likes
  }
 // db.get('userposts').findOneAndUpdate({local_id:local_id},{$set:{likes:(checkLikes(result))}})
  db.get('userposts').findOne({local_id:local_id}).then(result=>db.get('userposts').findOneAndUpdate({local_id:local_id},{$set:{likes:(checkLikes(result.likes))}}).then(result2=>{res.send({message:likeStatus})}))

})

app.listen(port, () => console.log(`PORT IS RUNNING ON ${port}`));
