import React from 'react'
import { CommentsLikes } from './CommentsLikes.component';

const Post =(props)=>{
    const {username,post,feeling,id,fullname,date,likes,local_id} = props.post;
  return (<div className={'post'} >
    <div className="user-details">
        <img src={require(`../profile-component/default.jpg`)}></img>
        <h2>{fullname}</h2>
    </div>
    <h3>{username}</h3>
    <div className="user-post">
        <h1>{post}</h1>
        <p>-------is feeling {feeling}</p>
    </div>
    <small>{date}</small>
    <CommentsLikes likes={likes} local_id={local_id}/>
    </div>
  )
}
export default React.memo(Post)