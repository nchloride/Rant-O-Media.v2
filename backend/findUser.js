const express = require('express');
const router = express.Router();
const db = require('./database');

//routes
router.get('/:fullname',(req,res)=>{
    const {fullname} = req.params;

    try {
        db.get('userinformation').find({fullname:{ $regex : `.*${fullname}.*`,$options: 'i'}},['fullname','icon','username', '_id'])
            .then(result=> res.json(result) )
    } catch (error) {
        res.send({message:error})
    }
    
})


module.exports =  router;