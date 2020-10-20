import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchedContainer from './SearchedContainer';
import SearchForm from './SearchForm'
import "./style.css"
const FindUser = () => {
    const [users,setUsers] = useState();
    const {username,icon,fullname} = JSON.parse(localStorage.getItem('userInformation'))
    const [followers,setFollowers] = useState([]);
    const handleUserSearch = async(data)=>{
    
        await axios.get(`/find/${data.fullname}`)
            .then(result=>setUsers(result.data));
    }
    useEffect(() => {
        const getFollowers = async()=>{
            await axios.get(`/searchUser/${username}`)
                .then(result=>{
                    if(result.data.followers){
                        setFollowers(result.data.followers)
                    }
                })
        }
        getFollowers();
    }, [])
    return (
        <div className="find-user">
            <SearchForm handleUserSearch={handleUserSearch}/>
            {users ? 
                <div className="find-user__search_container">
                    <h1>{users.length} {users.length>1?"users":"user"} found</h1>
                    {users?.map(user=>(<SearchedContainer key={user._id} user={user} followers={followers} loggedInUser={{username,fullname,icon}}/>))}
                </div>: 
                 <h1>Search for users</h1>
            }
        </div>
    )
}

export default FindUser
