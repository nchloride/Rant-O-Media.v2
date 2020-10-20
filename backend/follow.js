const db = require("./database")
const router = require('express').Router();

router.post('/',(req,res)=>{
    const {username,fullname,icon,usernameToFollow,fullnameToFollow,iconToFollow} = req.body;
    
    const updateFollows = (list,username,column)=>{
        if(column ==="following"){
            db.get('userinformation').findOneAndUpdate({username},{$set:{following:list}})
        }
        else{
            db.get('userinformation').findOneAndUpdate({username},{$set:{followers:list}})
        }
    }
    
    const CheckFollowing = (list,fullname,username,icon) =>{
        const user = {
            username,fullname,icon
        }
        if(list !==null && list !==undefined ){
            const alreadyFollowed = list.find(follow => follow.username === username);
            if(alreadyFollowed){
                console.log(alreadyFollowed);
                list = list.filter(follow => follow.username!== username); 
            }
            else{
                list = [...list,user]
            }
        }
        else{
            list = [user]
        }
        return list
    }
    //  Get user followers in the database
    db.get('userinformation').find({$or:[{username},{username:usernameToFollow}]})
        .then(result=>{
            let newFollowing;
            let newFollower;
           if(result[0].username ===username){   
                 newFollowing =  CheckFollowing(result[0].following,fullnameToFollow,usernameToFollow,iconToFollow);
                 newFollower =  CheckFollowing(result[1].followers,fullname,username,icon);
            }
            else{
                 newFollowing =  CheckFollowing(result[1].following,fullnameToFollow,usernameToFollow,iconToFollow);
                 newFollower =  CheckFollowing(result[0].followers,fullname,username,icon);
            }
            
            updateFollows(newFollowing,username,'following')
            updateFollows(newFollower,usernameToFollow,'follower')
            res.send({message:'following updated!'})
        })
})

module.exports = router