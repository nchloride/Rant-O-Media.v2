import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchedContainer from './SearchedContainer';
import SearchForm from './SearchForm'
import "./styles.css"
const FindUser = () => {
    const [users,setUsers] = useState();
    const {username,icon,fullname} = JSON.parse(localStorage.getItem('userInformation'))
    const [followers,setFollowers] = useState([]);
    const handleUserSearch = async(data)=>{
    
        await axios.get(`/find/${data.fullname}`)
            .then(result=>setUsers(result.data));
    }
    useEffect(() => {
        const getLoggedInUser = async()=>{
            await axios.get(`/searchUser/${username}`)
                .then(result=>{
                        setFollowers(result.data)
                })
        }
        getLoggedInUser();
    }, [])
    return (
        <div className="find-user">
            <SearchForm handleUserSearch={handleUserSearch}/>
            {users ? 
                <div className="find-user__search_container">
                    <h1>{users.length} {users.length>1?"users":"user"} found</h1>
                    {users?.map(user=>(<SearchedContainer key={user._id} user={user} loggedInUser={followers}/>))}
                </div>: 
                 <h1>Search for users</h1>
            }
        </div>
    )
}

export default FindUser
