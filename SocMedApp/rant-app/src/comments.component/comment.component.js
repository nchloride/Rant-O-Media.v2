import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { CommentForm } from './comment-form.component';

export const Comment = (props) => {
    const {comment,icon,username,fullname,_id} = props.comment;
    const {username:loggedInUser} = JSON.parse(localStorage.getItem('userInformation'));
    const [optionsOpen,setOptionsOpen] = useState(false);
    const [editEnabled,setEditEnabled] = useState(false)


    const handleDeleteComment =async ()=>{
        console.log(_id);
       await axios.delete(`/newsfeed/delete-comment/${_id}`)
       .then(result=>{
           props.setRefresh(true);
           setOptionsOpen(false);
           console.log(result);
       })
    }
    const handleEditComment = async(data)=>{
        data._id = _id
        await axios.put('/newsfeed/edit-comment',data)
        .then(result =>{
            props.setRefresh(true);
            setEditEnabled(false);
        })
    }

    useEffect(() => {
        const escapeKey = (e)=>{
           e.key ==="Escape" && setEditEnabled(false); setOptionsOpen(false)
        }
        document.addEventListener("keydown",escapeKey)
       
        
    }, [])
    return editEnabled?
    <div className="comment-edit">
        <CommentForm handleCommentSubmit={handleEditComment} icon={icon} />
        <div>press <a href="#" onClick={()=>setEditEnabled(false)}>ESC</a> to remove this</div>
    </div>
     : (
    <div className="comment">
        <img src={require(`../icon/${icon}`)}></img>
        <div className="comment-information"> 
                <Link to={{pathname:`/home/profile/${username}`}} className="comment-information-name">{fullname}</Link>
                <p>{comment}</p>
        </div>
        {loggedInUser === username? 
            <button onClick={()=>setOptionsOpen(prevData=>!prevData)} className="options-button">
                <div className="dot">
                </div>
                <div className="dot">
                </div>
                <div className="dot">
                </div>
            </button>:''}
        {optionsOpen && <div className="options-container">
            <button onClick={()=>setEditEnabled(true)} >edit</button>
            <button onClick={handleDeleteComment}>delete</button>
        </div>}
    </div>
    )
}
