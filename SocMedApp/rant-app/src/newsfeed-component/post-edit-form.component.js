import React,{useState} from 'react'
import {useForm} from "react-hook-form";
 
export const PostEditForm = ({post,handleEdit,icon}) => {
    const {fullname} = JSON.parse(localStorage.getItem('userInformation'));
    const {handleSubmit,register} = useForm();
    const [newPost,setNewPost] = useState(post);
    return (
        <form className='post-edit-form' onSubmit={handleSubmit(handleEdit)}>
            <section className="user-edit-details">
                <img src={require(`../icon/${icon}`)}></img>
                <h1>{fullname}</h1>
            </section>
            <textarea 
                value={newPost}
                onChange={(e)=>setNewPost(e.target.value)}
                name="post"
                ref={register({required:true})}>
            </textarea>
            <input type="submit"></input>
        </form>
    )
}
