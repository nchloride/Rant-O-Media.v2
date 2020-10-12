import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
export const UserInformation = createContext();
export function UserInformationContext(props) {
  const [userInformation, setUserInformation] = useState();
  useEffect(() => {
    const getInformation = async () => {
      await fetch("/islogin")
        .then((resp) => resp.json())
        .then((data) => setUserInformation(data));
    };
    getInformation();
  }, []);
  return (
    <UserInformation.Provider value={[userInformation, setUserInformation]}>
      {props.children}
    </UserInformation.Provider>
  );
}
