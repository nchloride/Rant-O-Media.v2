import React, { useEffect, useContext, useState } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { IsAuthenticated } from "../AuthContext/UserAuthorization";
import "./styles.css";
import LoadingAnimation from "../design/loading.animation.component";
import HomeNavigation from "../side-navigation/home-navigation.component";
import {PostRefresh} from "../post-refresh-context/post-refresh"
import Profile from "../newProfile/profile.component"
import NewsFeed from "../newsfeed-component/newsfeed.component";
import { Socials } from "../following-followers.component";
import FindUser from "../FindUser.component";
function HomeComponent(props) {
  const [loggedIn, setLoggedIn] = useContext(IsAuthenticated);
  const [loading, setLoading] = useState();
  const handleRedirect = () => {
    setLoggedIn(false);
    props.history.push("/");
    localStorage.removeItem("userInformation");
  };
  
  useEffect(() => {
    let isMounted = true;
    const isLogin = async () => {
      setLoading(true);
      await axios.get("/islogin").then((data) => {
        if (!data.data.authenticated) {
          handleRedirect();
        }
        isMounted && setLoading(false);
      });
    };
    isLogin();

    return () => (isMounted = false);
  }, []);
 
  return loading ? (
    <LoadingAnimation />
  ) : (
    <div className="home--page">
      <PostRefresh>
        <HomeNavigation />
        <Switch>
          <Route path="/home/searchUser"  children={<FindUser />} ></Route>
          <Route path="/home/:username"  children={<Profile />}></Route>
          <Route path="/home"  render={()=> JSON.parse(localStorage.getItem('userInformation')) ?  <NewsFeed/>:<LoadingAnimation/>
          }></Route>
        </Switch>
      </PostRefresh>
    </div>
  );
}

export default withRouter(HomeComponent);
