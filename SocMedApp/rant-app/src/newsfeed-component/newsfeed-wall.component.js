import React from 'react'
import Post from "./post-component"
export const NewsfeedWall = ({posts}) => {
    return (
        <div className="newsfeed-wall">
            {posts.length!==0 && posts.sort((a,b)=> (new Date(a.date)- new Date(b.date))).map((post,id) =>{ if(id+1===posts.length) {return (<Post key={id} index={id} post={post}/>)}})}
            {posts.length!==0 && posts.sort((a,b)=> (new Date(b.date)- new Date(a.date))).map((post,id) =>{ if(id!==0) {return (<Post key={id} index={id} post={post}/>)}})}
        </div>
    )
}
