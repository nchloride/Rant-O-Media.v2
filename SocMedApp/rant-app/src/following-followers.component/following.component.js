import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SearchedContainer from '../FindUser.component/SearchedContainer'



const Following = ({following ,loggedInUser}) => {
    const [users,setUsers] = useState([])
    useEffect(()=>{
        const getFollowingData = async(following,set)=>{
            if(following !== null){
                    await axios.get(`/searchUser/${following.username}`)
                        .then(result => set(prevData=>[...prevData,result.data]))
            }
        }
        if(following !== undefined){
            following.forEach(follow=>getFollowingData(follow,setUsers));
        }
    },[])
    return (
        <div className="follow">
            {users.length !==0 && users.map((user,id)=><SearchedContainer key={id} user={user} loggedInUser={loggedInUser}/>)}
        </div>
    )
}

export default Following
