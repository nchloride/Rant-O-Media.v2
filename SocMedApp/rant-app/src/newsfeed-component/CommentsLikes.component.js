import React,{useState,useEffect} from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import "./CommentsLikes.css"
import { CommentSection } from './comment-section.component';
import axios from 'axios';
export const CommentsLikes = ({likes,local_id}) => {
    const [commentSectionOpen,setCommentSectionOpen] = useState(false);
    const [liked,setLike] = useState(false);
    const [likesCount,setLikesCount] = useState(likes.length)
    const {username,fullname} = JSON.parse(localStorage.getItem("userInformation"));
    const handleLike = async()=>{
        setLike(prevData=>!prevData);
        const liker = {
            username,
            fullname,
            local_id
        }
        setLikesCount(prevCount=>liked?prevCount-1:prevCount+1);
        await axios.put("/likepost",liker).then(res=>{console.log(res.data)});
    }
    useEffect(() => {
        const isLike = ()=>{
            if(likes.length!==0){
                const isLiked = likes.filter(user=>user.username===username);
                if(isLiked.length!==0){
                    setLike(prevData=>!prevData);
                }
            }
        }
        isLike();
    }, [])
    return (
        <div className="comments-likes">
            <div className="buttons-display">
                <div className="buttons">
                    <button onClick={handleLike}>{liked?<ThumbUpAltIcon/>:<ThumbUpAltOutlinedIcon/>}</button>
                    <button onClick={()=>setCommentSectionOpen(prevData=>!prevData)}><CommentOutlinedIcon/></button>
                </div>
                <div className="likes-comments-counter">
                    <p>{likesCount} Likes</p>
                    <p>0 Comments</p>
                </div>
            </div>
            {commentSectionOpen && <CommentSection/>}
        </div>
    )
}
