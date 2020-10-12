import React, { useEffect, useState } from "react";
import { ProfileInfo } from "./profile-info.component";
import "./profile.css";
export const Profile = () => {
  return <div className="profile--page">{<ProfileInfo />}</div>;
};
