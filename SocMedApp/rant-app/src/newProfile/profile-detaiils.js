import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export const ProfileDetails = (props) => {
    const {fullname,username,address,email,icon,followers,following} = props.userData;
    useEffect(()=>{
        
    },[])
    return (
        <>
            <div className="profile__details">
                <img src={icon?require(`../icon/${icon}`):require('../icon/monkey.png')}></img>
                <h1>{fullname}</h1>
                <h2>{`@${username}`}</h2>
                <p>{address}</p>
                <small>{email}</small>
                <div className="follows">
                    <Link to={`/home/${username}/socials/followers`} className="followers">{followers && `${followers.length} followers`}</Link>
                    <Link to={`/home/${username}/socials/following`} className="following">{following && `${following.length} following`}</Link>
                </div>
            </div>
        </>
    )
}
