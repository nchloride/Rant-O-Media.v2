import axios from 'axios';
import React,{useEffect, useState,useContext} from 'react'
import { Route, useParams ,withRouter,Switch} from 'react-router';
import { ProfileDetails } from './profile-detaiils';
import "./profile.css"
import {NewsfeedWall} from "../newsfeed-component/newsfeed-wall.component";
import NewsFeedPosting from '../newsfeed-component/newsfeed-posting.component';
import {Socials} from "../following-followers.component"
import {RefreshPost} from "../post-refresh-context/post-refresh"
 const Profile = (props) => {
    const [refreshPost,setRefreshPost] = useContext(RefreshPost)
    const {username} = useParams()
    const [userData,setUserData] = useState([])
    const [userPosts,setUserPosts] = useState([])
    const loggedInUser = JSON.parse(localStorage.getItem('userInformation'));

    useEffect(() => {
        let isMounted = true;
        //Search for the user and the posts in the URL params
        const getUser = async()=>{
         await axios.get(`/searchuser/${username}`)
                .then(async (res)=>{
                    res.data ? setUserData(res.data):props.history.push('/home/profile/not-found');
                        await axios.post('/newsfeed/api/get-userposts',{username})
                            .then(res2 => isMounted && setUserPosts(res2.data));
                 }
            )
        }
        getUser();
        return () => {isMounted=false; console.log(userData);}
    }, [!refreshPost , username])

    
    return (
        <>
       
        <Switch>
                <Route path="/home/:username/socials" children={<Socials username={username} followers={userData.followers} following={userData.following}/>} >
                </Route>

                <Route path="/home/:username" children={
                    <div  className="profile">
                        {userData && <ProfileDetails userData={userData} loggedInUser = {loggedInUser} />}
                        {username === loggedInUser.username ?<NewsFeedPosting setPosts={setUserPosts}/>:null}
                        {userPosts.length!==0 && <NewsfeedWall posts = {userPosts}/>}
                    </div>}>
                </Route>
        </Switch>
        </>
    )
}
export default withRouter(Profile)