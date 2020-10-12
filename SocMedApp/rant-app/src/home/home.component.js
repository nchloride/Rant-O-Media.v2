import React, { useEffect, useContext, useState } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import { IsAuthenticated } from "../AuthContext/UserAuthorization";
import "./style.css";
import LoadingAnimation from "../design/loading.animation.component";
import HomeNavigation from "../side-navigation/home-navigation.component";
import { Profile } from "../profile-component/profile.component";
import NewsFeed from "../newsfeed-component/newsfeed.component";
function HomeComponent(props) {
  const [loggedIn, setLoggedIn] = useContext(IsAuthenticated);
  const [loading, setLoading] = useState();
  const handleRedirect = () => {
    setLoggedIn(false);
    props.history.push("/");
    localStorage.removeItem("userInformation");
  };

  useEffect(() => {
    console.log("Logged in to the app");
    let isMounted = true;
    const isLogin = async () => {
      setLoading(true);
      await axios.get("/islogin").then((data) => {
        console.log(data.data.authenticated);
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
      <HomeNavigation />
         <Switch>
        <Route path="/home/profile/:username" children={<Profile />}></Route>
        <Route path="/home/newsfeed" children={<NewsFeed/>}></Route>
      </Switch>
    </div>
  );
}

export default withRouter(HomeComponent);
