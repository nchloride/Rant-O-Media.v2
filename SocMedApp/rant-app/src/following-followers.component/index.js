import React from 'react'
import Followers from './followers.component'
import Following from './following.component'
import SocialsNav from "./socials-nav.component"
import {BrowserRouter  ,Route,Switch} from "react-router-dom"
import "./styles.css"

export const Socials = ({followers,following,username}) => {
      return (
        <div className="socials-main">
                <SocialsNav username={username}/>
                <Switch>
                    <Route path={`/home/${username}/socials/followers`} children={<Followers followers={followers}/>} exact/>
                    <Route path={`/home/${username}/socials/following`} children={<Following following={following}/>} exact/>
                </Switch>
        </div>
    )
}
