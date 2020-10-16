import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import NewsFeedPosting from "./newsfeed-posting.component"
import "./newsfeed.css"
import { NewsfeedWall } from "./newsfeed-wall.component";
import {RefreshPost} from "../post-refresh-context/post-refresh" 
export default function NewsFeed() {
  const [posts,setPosts]=useState([])
  const [refreshPost,setRefreshPost] = useContext(RefreshPost);
  useEffect(() => {
    window.scrollTo(0,0)
    let isMounted=true
    const getUserPosts= async()=>{
      await axios('/newsfeed/api/userposts').then(res=>{
        isMounted && setPosts(res.data);
      })
    }
    getUserPosts()
    return () =>isMounted=false
  }, [!refreshPost])
   return (
    <div className="newsfeed--page">
      <NewsFeedPosting setPosts={setPosts}/>
      
      <NewsfeedWall posts={posts}/>
    </div>
   )
}
