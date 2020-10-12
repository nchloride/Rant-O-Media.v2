import React from "react";
import { NavLink } from "react-router-dom";
function NavigationButton({ path, logo: Logo, title }) {
  return (
    <ul className="home-nav-list">
      <li>
        <NavLink
          tabIndex="0"
          to={{ pathname: path }}
          activeClassName="nav-active"
          className="nav-links"
       
        >
          <Logo /> <div className="nav-links-title">{title}</div>
        </NavLink>
      </li>
    </ul>
  );
}

export default NavigationButton;
