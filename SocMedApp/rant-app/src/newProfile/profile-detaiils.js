import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import useIsFollow from '../followHooks/useIsFollow';
import axios from "axios"

export const ProfileDetails = (props) => {
    const {fullname,username,address,email,icon,followers,following} = props.userData;
    const [followersCount,setFollowersCount] = useState()
    const [isFollowed,setIsFollowed] = useIsFollow(props.loggedInUser.username,followers)
    const handleFollow = async () => {
        const data = {
            username:props.loggedInUser.username,
            fullname:props.loggedInUser.fullname,
            icon:props.loggedInUser.icon,
            usernameToFollow:username,
            fullnameToFollow:fullname,
            iconToFollow:icon,
        }
        setIsFollowed(prevData => !prevData)
        setFollowersCount(prevCount => isFollowed ? prevCount-1 : prevCount+1);
        await axios.post("/follow",data);
    }
    useEffect(() => {
        setFollowersCount(followers?.length || 0)
        console.log(props.userData);
    }, [followers])
   
    return  (
        <>
            <div className="profile__details">
                <img src={icon?require(`../icon/${icon}`):require('../icon/monkey.png')}></img>
                <h1>{fullname}</h1>
                <h2>{`@${username}`}</h2>
                <p>{address}</p>
                <small>{email}</small>
                <div className="follows">
                    <Link to={`/home/${username}/socials/followers`} className="followers">{followersCount ? followersCount : '0'} followers</Link>
                    <Link to={`/home/${username}/socials/following`} className="following">{following ? following.length : '0'} following</Link>
                </div>
                {props.loggedInUser.username !== username && <button onClick={handleFollow} style={{backgroundColor:isFollowed?"orange":"white"}}>{isFollowed ? "Following":'Follow'}</button>}
             
                
            </div>
        </>
    ) 
}
export default React.memo(ProfileDetails)