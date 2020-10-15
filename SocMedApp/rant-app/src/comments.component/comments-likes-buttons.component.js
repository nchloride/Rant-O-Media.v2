import React from 'react'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CommentIcon from '@material-ui/icons/Comment';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
export const CommentSectionButtons = ({setCommentSectionOpen,handleLike,liked,commentSectionOpen,likesCount,comments}) => {
    return (
    <div className="buttons-display">
        <div className="buttons">
            <button onClick={handleLike}>{liked?<ThumbUpAltIcon/>:<ThumbUpAltOutlinedIcon/>}</button>
            <button onClick={()=>setCommentSectionOpen(prevData=>!prevData)}>{commentSectionOpen?<CommentIcon/>:<CommentOutlinedIcon/>}</button>
        </div>
        <div className="likes-comments-counter">
            <p>{likesCount} Likes</p>
            <p>{comments? comments.length:0} Comments</p>
        </div>
    </div>
    )
}
