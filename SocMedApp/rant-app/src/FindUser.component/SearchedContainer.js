import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
const SearchedContainer = ({user,loggedInUser}) => {
    
    useEffect(() => {
        console.log(user);
    }, [])
    const followValidator = (username,followers = [])=>{
            if(followers!==undefined && followers.length!==0){
                const followed = followers.find(follower => follower.username ===username);
                if(followed){
                    return true;
                }
                return false;
            }
            return false
    }

    const handleFollow = async ()=>{
        const followData = {
            username:loggedInUser.username,
            fullname:loggedInUser.fullname,
            icon:loggedInUser.icon,
            usernameToFollow:user.username,
            fullnameToFollow:user.fullname,
            iconToFollow:user.icon
        }
        await axios.post('/follow',followData).then(result=>{
            setIsFollowed(prevData=>!prevData);
        }) 
    }

    const [isFollower,setIsFollower] = useState(followValidator(user.username,loggedInUser.followers))
    const [isFollowed,setIsFollowed] = useState(followValidator(loggedInUser.username,user.followers))
    return (
        <div className="searched_user">
            <Link to={`/home/${user.username}`} className="user__link"> 
                <img src={require(`../icon/${user.icon}`)} alt={`${user.username}--${user.username}-icon`}></img>
                <section>
                    <h1>{user.fullname}</h1>
                    <h2>@{user.username}</h2>
                    {isFollower && isFollowed? "You follow each other": isFollower?"Follows you" : ""}
                </section>
            </Link>
            {loggedInUser.username!==user.username &&
                <button onClick={handleFollow}
                     style={{backgroundColor:isFollowed && "orange"}}>
                     {isFollowed?"Following":'Follow'}
                </button>}
        </div>
    )
}

export default SearchedContainer
