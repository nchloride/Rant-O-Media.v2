import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import SearchContainer from './SearchContainer';
import "./style.css"
const FindUser = () => {
    const [users,setUsers] = useState();
    const {handleSubmit,register} = useForm();
    const handleUserSearch = async(data)=>{
    
        await axios.get(`/find/${data.fullname}`)
            .then(result=>setUsers(result.data));
    }
    return (
        <div className="find-user">
            <form className="find-user__search_bar" onSubmit={handleSubmit(handleUserSearch)}>
                <input placeholder="Search user" name="fullname" ref={register({required:true})}></input>
            </form>
            {users ? 
                <div className="find-user__search_container">
                    <h1>{users.length} {users.length>1?"users":"user"} found</h1>
                    {users?.map(user=>(<SearchContainer key={user._id} user={user}/>))}
                </div>: 
                 <h1>Search for users</h1>
            }
        </div>
    )
}

export default FindUser
