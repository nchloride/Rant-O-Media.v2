import React, { useState,useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./style.css";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import NavigationButton from "./navigation-links.component";

function HomeNavigation(props) {
  const [userInformation] = useState(
    JSON.parse(localStorage.getItem("userInformation"))
  );
  const handleLogout = async () => {
    await fetch("/logout").then((res) => {
      props.history.push("/");
      localStorage.removeItem("userInformation");
    });
  };
  useEffect(() => {
  console.log('SIDENAV RENDERED');
  }, [])
  return (
    <nav className="home--nav">
      <div className="home-nav-links">
        <NavigationButton
          path={`/home/profile/${userInformation?.username}`}
          logo={AccountCircleIcon}
          title="Profile"
          
        />
        <NavigationButton
          path="/home/friends"
          logo={SupervisedUserCircleIcon}
          title="Friends"
        />
        <NavigationButton
          path="/home/newsfeed"
          logo={HomeIcon}
          title="NewsFeed"
          
        />
      </div>
      <ul className="home-nav-list">
        <li className="nav-links" onClick={handleLogout} tabIndex="0">
          <ExitToAppIcon /> <div className="nav-links-title">Log Out</div>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(HomeNavigation);
