import React,{useState,useContext,useEffect} from 'react'
import { OptionButton } from '../delete-update-component/option-button.component'
import { OptionsContainer } from '../delete-update-component/options-container.component'
import Modal from "react-modal"
import axios from 'axios'
import {RefreshPost} from "../post-refresh-context/post-refresh";
import { PostEditForm } from './post-edit-form.component'
import {Link} from "react-router-dom"
const modalEditStyle = {
    content:{
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "50%",
        width: "45%",
        backgroundColor: "rgb(70, 70, 70)"
    }
}

const modalDeleteStyle = {
    content:{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "10%",
        width: "20%",
    }
}

export const PostDetails = ({icon,fullname,username,post,date,feeling,local_id}) => {
    const [optionsOpen,setOptionsOpen] = useState(false);
    const [modalEditOpen,setModalEditOpen] = useState(false);
    const [modalDeleteOpen,setModalDeleteOpen] = useState(false);
    const {username:loggedInUser} = JSON.parse(localStorage.getItem("userInformation"));
    const [refreshPost,setRefreshPost] = useContext(RefreshPost);

    const stateReset = prevData => !prevData
    const handlePostDelete = async()=>{
        await axios.delete(`/newsfeed/api/posts/${local_id}`)
        .then(result=>{
            setModalDeleteOpen(stateReset) 
            setOptionsOpen(stateReset)
            setRefreshPost(stateReset)
        })
    }
    const handlePostEdit = async(data)=>{
        data.local_id=local_id;
        await axios.put('/newsfeed/api/posts',{data}).
            then(res=>{
                setModalEditOpen(stateReset);
                setOptionsOpen(stateReset);
                setRefreshPost(stateReset);
            })
    }

    return (
    <>
        <div className="details-options-container">
            <div className="user-details">
                <img src={require(`../icon/${icon}`)}></img>
                <Link to={`/home/${username}`} className="link">{fullname}</Link>
                
            </div>
            <div className="user-options">
                { loggedInUser ===username && 
                    <OptionButton setOptionsOpen={setOptionsOpen}/>
                }

                {optionsOpen && <OptionsContainer 
                    setEditEnabled={setModalEditOpen} 
                    handleDelete={()=>setModalDeleteOpen(prevData=>!prevData)}/>
                }
            </div>
        </div>
        <h3>{username}</h3>
        <div  className="user-post">
            <h1>{post}</h1>
            <p>-------is feeling {feeling}</p>
        </div>
        <small>{date}</small>
        <Modal isOpen={modalEditOpen} style={modalEditStyle}>
            <button 
                style={{backgroundColor:"rgb(88,88,88)",color:'white',borderRadius:"50%", marginLeft:'95%'}}
                onClick={()=>{setModalEditOpen(prevData=>!prevData); setOptionsOpen(prevData=>!prevData)}}>
            X</button>
            <PostEditForm handleEdit={handlePostEdit} icon={icon} post={post}/>
        </Modal>

        <Modal isOpen={modalDeleteOpen} style={modalDeleteStyle}>
             <h1>Delete this post?</h1>
             <button onClick={handlePostDelete}>Yes</button>
             <button onClick={()=>{setModalDeleteOpen(prevData=>!prevData); setOptionsOpen(prevData=>!prevData)}}>No</button>
        </Modal>
    </>
    )
}
