import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import NewsFeedPosting from "./newsfeed-posting.component"
import "./newsfeed.css"
import { NewsfeedWall } from "./newsfeed-wall.component";
import {RefreshPost} from "../post-refresh-context/post-refresh" 
export default function NewsFeed() {
  const [posts,setPosts]=useState([])
  //Refresh Newsfeed wall whenever the user post
  const [refreshPost,setRefreshPost] = useContext(RefreshPost);

  useEffect(() => {
    let isMounted=true

    const getUserPosts= async()=>{
      await axios.get('/newsfeed/api/posts').then(res=>{
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
