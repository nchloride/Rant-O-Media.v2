import React from 'react'
import { Link } from 'react-router-dom';
const SearchContainer = ({user}) => {
    return (
        <div className="searched_user">
            <Link to={`/home/profile/${user.username}`} className="user__link"> 
                <img src={require(`../icon/${user.icon}`)}></img>
                {user.fullname}
            </Link>
        </div>
    )
}

export default SearchContainer
