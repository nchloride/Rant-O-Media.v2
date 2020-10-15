const db = require('./database');
const router = require('express').Router();
const ObjectId =require('mongodb').ObjectId
router.post('/post',(req,res)=>{
    const {post,username,feeling,date,fullname}= req.body;
    db.get('userposts').insert(req.body)
    res.send({message:'Posted!'})
  })

router.get('/api/userposts',(req,res)=>{
    db.get('userposts').find({}).then(result=>{
      res.json(result)
    });
  })
router.post('/api/get-userposts',(req,res)=>{
    const {username} = req.body;
    db.get('userposts').find({username}).then(result => res.json(result));
})
router.put('/likepost',(req,res)=>{
    const {local_id,username,fullname} = req.body;
    let likeStatus;
    const checkLikes = (likes)=>{
      if( likes !==null || likes.length!==0){
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
   db.get('userposts').findOne({local_id:local_id})
    .then(result=>db.get('userposts').findOneAndUpdate({local_id:local_id},{$set:{likes:(checkLikes(result.likes))}})
    .then(result2=>{res.send({message:likeStatus})}))
  
  })
  //  Comment
  router.post("/insert-comment",(req,res)=>{
    const {comment,username,fullname,icon,local_id} = req.body;
    db.get('usercomments').insert(req.body)
    .then(result=>res.send({message:'comment inserted!'}))
  })
  router.post('/api/get-comments',(req,res)=>{
    const {local_id} = req.body
    db.get('usercomments').find({postID:local_id})
    .then(result=>res.json(result));
  })
  router.delete('/delete-comment/:_id',(req,res)=>{
    const _id = req.params._id;
    db.get('usercomments').findOneAndDelete({_id})
    .then(result=>res.send(result))
  })
  router.put('/edit-comment',(req,res)=>{
    const {_id,comment} = req.body;
    db.get('usercomments').findOneAndUpdate({_id},{$set:{comment}})
    .then(result => res.send({message:'comment updated!'}))
  })
  module.exports = router