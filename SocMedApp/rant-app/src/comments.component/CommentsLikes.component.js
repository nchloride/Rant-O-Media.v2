import React,{useState,useEffect} from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import "./CommentsLikes.css"
import { CommentSection } from './comment-section.component';
import axios from 'axios';
import { CommentSectionButtons } from './comments-likes-buttons.component';
export const CommentsLikes = ({likes,local_id,comments,setRefresh}) => {
    const [commentSectionOpen,setCommentSectionOpen] = useState(false);
    const [liked,setLike] = useState(false);
   
    const [likesCount,setLikesCount] = useState(likes.length)

    const {username,fullname} = JSON.parse(localStorage.getItem("userInformation"));
    const liker = {
        username,
        fullname,
        local_id
    }
    const handleLike = async()=>{
        setLike(prevData=>!prevData);
        setLikesCount(prevCount=>liked?prevCount-1:prevCount+1);
        await axios.put("/newsfeed/likepost",liker).then(res=>{console.log(res.data)});
    }
    useEffect(() => {
        let currentLikeStatus;
        const isLike = ()=>{
            if(likes.length!==0){
                const isLiked = likes.filter(user=>user.username===username);
                if(isLiked.length!==0){
                    setLike(prevData=>!prevData);
                    currentLikeStatus = true;
                }
            }
        }
        isLike();
  }, [])
    return (
        <div className="comments-likes">
            <CommentSectionButtons 
            handleLike={handleLike} 
            liked={liked} 
            setCommentSectionOpen={setCommentSectionOpen} 
            commentSectionOpen={commentSectionOpen} 
            likesCount={likesCount} 
            comments={comments}/>
            
            {commentSectionOpen && <CommentSection local_id={local_id}
             username={username}
             fullname={fullname} 
             comments={comments}
             setRefresh={setRefresh}
          />}
        </div>
    )
}
