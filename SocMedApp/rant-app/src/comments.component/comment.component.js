import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Link } from "react-router-dom";
import { OptionButton } from '../delete-update-component/option-button.component';
import { OptionsContainer } from '../delete-update-component/options-container.component';
import { CommentForm } from './comment-form.component';

export const Comment = (props) => {
    const {comment,icon,username,fullname,_id} = props.comment;
    const {username:loggedInUser} = JSON.parse(localStorage.getItem('userInformation'));
    const [optionsOpen,setOptionsOpen] = useState(false);
    const [editEnabled,setEditEnabled] = useState(false)


    const handleDeleteComment =async ()=>{
        console.log(_id);
        // await axios.delete(`/newsfeed/delete-comment/${_id}`)
        await axios.delete(`/newsfeed/api/comments/${_id}`)
            .then(result=>{
                props.setRefresh(true);
                setOptionsOpen(false);
                console.log(result);
            })
    }
    const handleEditComment = async(data)=>{
        data._id = _id
        // await axios.put('/newsfeed/edit-comment',data)
        await axios.put('/newsfeed/api/comments',data)
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
        <CommentForm handleCommentSubmit={handleEditComment} icon={icon} value={comment} />
        <div>press <a href="#" onClick={()=>setEditEnabled(false)}>ESC</a> to remove this</div>
    </div>
     : (
    <div className="comment">
        <img src={require(`../icon/${icon}`)}></img>
        <div className="comment-information"> 
                <Link to={{pathname:`/home/profile/${username}`}} className="comment-information-name">{fullname}</Link>
                <p>{comment}</p>
        </div>
        {loggedInUser === username &&
            <OptionButton setOptionsOpen={setOptionsOpen}/>}
        {optionsOpen && 
            <OptionsContainer 
             setEditEnabled = {setEditEnabled}
             handleDelete={handleDeleteComment}
        />}
    </div>
    )
}
