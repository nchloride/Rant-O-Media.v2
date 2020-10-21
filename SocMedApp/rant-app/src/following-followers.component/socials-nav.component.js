import React from 'react'
import {NavLink} from "react-router-dom"
const SocialsNav = ({username}) => {
    return (
        <div className="socials-nav">
            <NavLink
             to={`/home/${username}/socials/followers`}
             tabIndex="0"
             activeClassName="nav-active"
             className="nav-links">
            <h1>Followers</h1>
             </NavLink>

            <NavLink
             to={`/home/${username}/socials/following`}
             tabIndex="0"
             activeClassName="nav-active"
             className="nav-links">
            <h1>Following</h1>
            </NavLink>
        </div>
    )
}

export default SocialsNav
