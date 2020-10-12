import axios from "axios";
import React,{useState,useEffect} from "react";
import NewsFeedPosting from "./newsfeed-posting.component"
import Post from "./post-component"
import "./newsfeed.css"

export default function NewsFeed() {
  const [posts,setPosts]=useState([])
  
  useEffect(() => {
    window.scrollTo(0,0)
    let isMounted=true
    const getUserPosts= async()=>{
      await axios('/api/userposts').then(res=>{
        isMounted && setPosts(res.data);
      })
    }
    getUserPosts()
    return () =>isMounted=false
  }, [])
   return <div className="newsfeed--page">
    <NewsFeedPosting setPosts={setPosts}/>
    <div className="newsfeed-wall">
      {posts.length!==0 && posts.sort((a,b)=> (new Date(a.date)- new Date(b.date))).map((post,id) =>{ if(id+1===posts.length) {return (<Post key={id} index={id} post={post}/>)}})}
      {posts.length!==0 && posts.sort((a,b)=> (new Date(b.date)- new Date(a.date))).map((post,id) =>{ if(id!==0) {return (<Post key={id} index={id} post={post}/>)}})}
    </div>
  </div>;
}
