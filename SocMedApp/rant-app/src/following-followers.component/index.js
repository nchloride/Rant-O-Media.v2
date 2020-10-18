import React from 'react'
import Followers from './followers.component'
import Following from './following.component'
import SocialsNav from "./socials-nav.component"
import {BrowserRouter  ,Route,Switch} from "react-router-dom"
import "./styles.css"

export const Socials = () => {
      return (
        <div className="socials-main">
                <SocialsNav/>
                <Switch>
                    <Route path="/home/socials/followers" children={<Followers/>} exact/>
                    <Route path="/home/socials/following" children={<Following/>} exact/>
                </Switch>
        </div>
    )
}
