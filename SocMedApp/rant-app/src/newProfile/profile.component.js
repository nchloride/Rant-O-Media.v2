import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { Redirect, Route, useParams ,withRouter,Switch} from 'react-router';
import { ProfileDetails } from './profile-detaiils';
import "./profile.css"
import {NewsfeedWall} from "../newsfeed-component/newsfeed-wall.component";
import NewsFeedPosting from '../newsfeed-component/newsfeed-posting.component';
import {Socials} from "../following-followers.component"
 const Profile = (props) => {
    const {username} = useParams()
    const [userData,setUserData] = useState([])
    const [userPosts,setUserPosts] = useState([])
    const {username:loggedInUser} = JSON.parse(localStorage.getItem('userInformation'));
    useEffect(() => {
        let isMounted = true;
        const getUser = async()=>{
        isMounted && await axios.get(`/searchuser/${username}`)
                .then(async (res)=>{
                    res.data ? setUserData(res.data):props.history.push('/home/profile/not-found');
                    await axios.post('/newsfeed/api/get-userposts',{username})
                     .then(res2 => setUserPosts(res2.data));
                 }
            )
        }
        getUser();
        return () => isMounted=false
    }, [username])

    
    return (
        <>
        <Switch>
                <Route path="/home/:username/socials" children={<Socials username={username} followers={userData.followers} following={userData.following}/>}>
                </Route>
                <Route path="/home/:username" children={
                    <div  className="profile">
                        {userData && <ProfileDetails userData={userData}/>}

                        {username === loggedInUser ?<NewsFeedPosting setPosts={setUserPosts}/>:null}
                        {userPosts.length!==0 && <NewsfeedWall posts = {userPosts}/>}
                    </div>}>
                </Route>
                
               
        </Switch>
        </>
    )
}
export default withRouter(Profile)