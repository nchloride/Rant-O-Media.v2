import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchedContainer from "../FindUser.component/SearchedContainer"


const Followers = ({followers,loggedInUser}) => {
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const getFollowerData = async follower=>{
            await axios.get(`/searchUser/${follower.username}`)
                .then(result => setUsers(prevUser => [...prevUser,result.data]))
        }
        if(followers!==undefined){
            followers.forEach(follower=>getFollowerData(follower));
        }
    },[]);
    return (
        <div className="follow">
            {users && users.map((user,id)=><SearchedContainer key={id} loggedInUser={loggedInUser} user={user}/>)}
        </div>
    )
}

export default Followers
