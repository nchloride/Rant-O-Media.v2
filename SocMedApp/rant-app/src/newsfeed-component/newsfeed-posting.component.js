import axios from 'axios';
import React,{useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { v1 as uuidv1 } from 'uuid';
export const NewsFeedPosting = ({setPosts}) => {
    const {handleSubmit,register,reset} = useForm();
    const feelings = ['Sad','Happy','Excited','Demonyo','Dumb']
    const {fullname,username} = JSON.parse(localStorage.getItem('userInformation'))

    const handlePost =  async (data)=>{
        data.username=username;
        data.fullname=fullname;
        data.local_id = uuidv1();
        data.likes=[];
        data.date=Date();
        await axios.post('/post',data).then(res=>console.log(res))
        setPosts(prevPosts=>[...prevPosts,data])
        reset()
    }

    return (
        <>
        <form className ="newsfeed-post-form" onSubmit={handleSubmit(handlePost)}>
            <textarea name="post" ref={register({required:true})}  placeholder={`What's on your mind, ${fullname}`} ></textarea>
            <select name="feeling" ref={register({required:true})}>
                 {feelings.map((feeling,id)=>(<option key={id} value={feeling} >is feeling {feeling}</option>))}
            </select>
            <input type="submit"></input>
        </form>
   
        </>
    )
}
export default NewsFeedPosting