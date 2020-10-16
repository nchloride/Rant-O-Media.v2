import React,{useState,useContext,useEffect} from 'react'
import { OptionButton } from '../delete-update-component/option-button.component'
import { OptionsContainer } from '../delete-update-component/options-container.component'
import Modal from "react-modal"
import axios from 'axios'
import {RefreshPost} from "../post-refresh-context/post-refresh";
const modalEditStyle = {
    content:{
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        height: "400px",
        width: "700px",
    }
}

const modalDeleteStyle = {
    content:{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "80px",
        width: "300px",
    }
}

export const PostDetails = ({icon,fullname,username,post,date,feeling,local_id}) => {
    const [optionsOpen,setOptionsOpen] = useState(false);
    const [modalEditOpen,setModalEditOpen] = useState(false);
    const [modalDeleteOpen,setModalDeleteOpen] = useState(false);
    const {username:loggedInUser} = JSON.parse(localStorage.getItem("userInformation"));
    const [refreshPost,setRefreshPost] = useContext(RefreshPost);
    useEffect(() => {
        console.log(local_id);
    }, [])
    const handlePostDelete = async()=>{

        await axios.delete(`/newsfeed/delete-post/${local_id}`)
        .then(result=>{
            console.log(result.data);
            setModalDeleteOpen(prevData=>!prevData) 
            setOptionsOpen(prevData=>!prevData)
            setRefreshPost(prevData=>!prevData)
        })
     
    }

    return (
    <>
        <div className="details-options-container">
        <div className="user-details">
            <img src={require(`../icon/${icon}`)}></img>
            <h2>{fullname}</h2>
        </div>
        <div className="user-options">
        { loggedInUser ===username && 
        <OptionButton setOptionsOpen={setOptionsOpen}/>
        }

        {optionsOpen && <OptionsContainer setEditEnabled={setModalEditOpen} handleDelete={()=>setModalDeleteOpen(prevData=>!prevData)}/>}
        </div>
        </div>
        <h3>{username}</h3>
        <div  className="user-post">
            <h1>{post}</h1>
            <p>-------is feeling {feeling}</p>
        </div>
        <small>{date}</small>
        <Modal isOpen={modalEditOpen} style={modalEditStyle}>
            <button onClick={()=>{setModalEditOpen(prevData=>!prevData); setOptionsOpen(prevData=>!prevData)}}>X</button>
        </Modal>

        <Modal isOpen={modalDeleteOpen} style={modalDeleteStyle} >
             <h1>Delete this post?</h1>
             <button onClick={handlePostDelete}>Yes</button>
             <button onClick={()=>{setModalDeleteOpen(prevData=>!prevData); setOptionsOpen(prevData=>!prevData)}}>No</button>
        </Modal>
    </>
    )
}
