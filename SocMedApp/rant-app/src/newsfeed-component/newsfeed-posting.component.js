import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid';
export const NewsFeedPosting = ({setPosts}) => {
    const {handleSubmit,register,reset} = useForm();
    const feelings = ['Sad','Happy','Excited','Demonyo','Dumb']
    const {fullname,username,icon} = JSON.parse(localStorage.getItem('userInformation'))

    const handlePost =  async (data)=>{
        data.username=username;
        data.fullname=fullname;
        data.local_id = uuidv1();
        data.likes=[];
        data.icon = icon;
        data.date=Date();

        await axios.post('/newsfeed/api/posts',data).then(res=>console.log(res))
        setPosts(prevPosts=>[...prevPosts,data])
        reset()
    }

    return (
        <>
        <form className ="newsfeed-post-form" onSubmit={handleSubmit(handlePost)}>
            <div className="newsfeed-post-form-input-container">
                <img src={require(`../icon/${icon}`)}/>
                <textarea name="post" autoComplete="no" ref={register({required:true})}  placeholder={`What's on your mind, ${fullname}`} ></textarea>
            </div>
            <div className="newsfeed-post-form-button-container">
                <select name="feeling" ref={register({required:true})}>
                    {feelings.map((feeling,id)=>(<option key={id} value={feeling} >is feeling {feeling}</option>))}
                </select>
                <input type="submit"></input>
            </div>
        </form>
   
        </>
    )
}
export default NewsFeedPosting