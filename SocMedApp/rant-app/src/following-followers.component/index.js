import React from 'react'
import Followers from './followers.component'
import Following from './following.component'
import SocialsNav from "./socials-nav.component"
import {BrowserRouter  ,Route,Switch} from "react-router-dom"
import "./styles.css"

export const Socials = ({followers,following,username}) => {
        // Followers && Following contains username,icon,fullname
        const loggedInUser = JSON.parse(localStorage.getItem('userInformation'))
      return (
        <div className="socials-main">
                <SocialsNav username={username}/>
                <Switch>
                    <Route path={`/home/${username}/socials/followers`} children={<Followers followers={followers} loggedInUser={loggedInUser}/>} exact/>
                    <Route path={`/home/${username}/socials/following`} children={<Following following={following} loggedInUser={loggedInUser}/>} exact/>
                </Switch>
        </div>
    )
}
