import React from 'react'

export const PostDetails = ({icon,fullname,username,post,date,feeling}) => {
    return (
    <>
        <div className="user-details">
            <img src={require(`../icon/${icon}`)}></img>
            <h2>{fullname}</h2>
        </div>
         <h3>{username}</h3>
        <div className="user-post">
            <h1>{post}</h1>
            <p>-------is feeling {feeling}</p>
        </div>
        <small>{date}</small>
    </>
    )
}
