import React, { createContext, useState } from "react";
export const IsAuthenticated = createContext();
export function UserAuthorizationContext(props) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <IsAuthenticated.Provider value={[loggedIn, setLoggedIn]}>
      {props.children}
    </IsAuthenticated.Provider>
  );
}
