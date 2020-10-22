const db = require('./database');
const router = require('express').Router();
const ObjectId =require('mongodb').ObjectId
  //POST

router.post('/api/posts',(req,res)=>{
    const {post,username,feeling,date,fullname}= req.body;
    db.get('userposts').insert(req.body)
    res.send({message:'Posted!'})
  })

router.delete('/api/posts/:postID',(req,res)=>{
    //Destructure request parameters
    const {postID} =req.params;
    //Call userposts collections then delete post
    //Call usercomments collection then delete all comments in that post
    //Send message "Post Deleted!"
    db.get('userposts').findOneAndDelete({local_id:postID})
    .then(result=>{
      db.get('usercomments').remove({postID})
        .then(result2=>res.send({message:"POST DELETED!"}))
    })
  

  })
router.put('/api/posts',(req,res)=>{
  const {local_id,post} = req.body.data;
  db.get('userposts').findOneAndUpdate({local_id},{$set:{post}}).
  then(result=>res.send({ message:"post updated" }));
})
router.get('/api/posts',(req,res)=>{
    db.get('userposts').find({}).then(result=>{
      res.json(result)
    });
  })
router.post('/api/get-userposts',(req,res)=>{
    const {username} = req.body;
    db.get('userposts').find({username}).then(result => res.json(result));
})
//@Desc route for liking post, adding the liker's info in the post's likes
router.put('/likepost',(req,res)=>{
    const {local_id,username,fullname} = req.body;
    let likeStatus;
    //@Desc if the user likes the post, delete like, else like
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
  
    //@Desc Comment
    router.post("/api/comments",(req,res)=>{
      const {comment,username,fullname,icon,local_id} = req.body;
      db.get('usercomments').insert(req.body)
      .then(result=>res.send({message:'comment inserted!'}))
    })
    router.get('/api/comments/:id',(req,res)=>{
   
      const {id} = req.params
      db.get('usercomments').find({postID:id})
        .then(result=>res.json(result));
    })
    router.delete('/api/comments/:_id',(req,res)=>{
      const _id = req.params._id;
      db.get('usercomments').findOneAndDelete({_id})
      .then(result=>res.send(result))
    })
    router.put('/api/comments',(req,res)=>{
      const {_id,comment} = req.body;
      db.get('usercomments').findOneAndUpdate({_id},{$set:{comment}})
      .then(result => res.send({message:'comment updated!'}))
    })
  module.exports = router