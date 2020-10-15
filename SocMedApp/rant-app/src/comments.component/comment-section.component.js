import axios from "axios";
import React,{useEffect} from 'react';
import {useForm} from "react-hook-form";
import { CommentForm } from "./comment-form.component";

import {Comment} from "./comment.component"

export const CommentSection = ({local_id,username,fullname,comments,setRefresh}) => {
    const {handleSubmit,register,reset}=useForm();
    const {icon} = JSON.parse(localStorage.getItem('userInformation'));
    const handleCommentSubmit = async(data)=>{
        data.postID = local_id;
        data.username = username;
        data.fullname = fullname;
        data.icon = icon;
        console.log(data);
        reset();
        setRefresh(prevData=>!prevData);
        await axios.post('/newsfeed/insert-comment',data)
        .then(res=>console.log(res));
    }
 
    return (
        <div className="comment-section" >
            <div className="comment-section-box">
                {comments && comments.map((comment,id)=><Comment comment={comment} setRefresh={setRefresh} key={id}/>)}
            </div>
            <CommentForm handleCommentSubmit={handleCommentSubmit} icon={icon}/>      
        </div>
    )
}
