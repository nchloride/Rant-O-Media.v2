const express  = require('express');
const router = express.Router();

module.exports = (db,upload,fs)=>{
    router.put("/editprofile", (req, res) => {
        const { _id, fullname, email, address } = req.body;
        console.log(req.file);
        db.get("userinformation").findOneAndUpdate(
          { _id },
          { $set: { fullname, email, address } }
        );
      
        res.json({ message: "Profile Updated" });
      });
    router.post("/uploadpicture", (req, res) => {
        upload(req, res, (err) => {
          {
            if (err) {
              console.log(err);
            } else {
              console.log(req.file);
              db.get("userinformation").findOneAndUpdate(
                { _id: req.body._id },
                { $set: { profilePicture: req.file.filename } }
              );
              res.json({ message: "Picture uploaded" });
            }
          }
        });
      });
      router.delete('/deletepicture',(req,res)=>{
          console.log('delete route: ',req.body)
          const filePath = `../SocMedApp/rant-app/src/pictures-uploads/${req.body.pictureName}`
        //   try {
        //     fs.unlinkSync(filePath);
        //     res.send({message:`photo:${req.body.pictureName} deleted`})
        //   } catch (error) {
        //       console.log(error);
        //   }
      })
      return router
    
}