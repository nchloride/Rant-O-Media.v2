import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LogoComponent from "../design/logo.component";
import "./login.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { IsAuthenticated } from "../AuthContext/UserAuthorization";
import Register from "../register-component/register.component";

function LoginComponent(props) {
  const [loggedIn, setLoggedIn] = useContext(IsAuthenticated);

  const { handleSubmit, register } = useForm();
  const [openModal, setModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const onUserLogin = async (data) => {
    await fetch("/login", {
      mode: "cors",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (resp) => {
        if (resp.authenticated) {
          setLoggedIn(true);
          localStorage.setItem("userInformation", JSON.stringify({username:resp.data.username,fullname:resp.data.fullname}));
        } else {
          return;
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    let isMounted = true;
    const isLogin = async () => {
      await axios.get("/islogin").then((data) => {
        if (data.data.authenticated) {
          isMounted && setLoggedIn(true);
        }
      });
    };
    isLogin();
    return () => (isMounted = false);
  }, []);

  return loggedIn ? (
    <Redirect to="/home" />
  ) : (
    <>
      <div className="login--tab">
        <LogoComponent />
        <form onSubmit={handleSubmit(onUserLogin)} className="login--tab-form">
          <h1>POST ALL THE SHIT YOU WANT</h1>
          <input
            type="text"
            name="username"
            ref={register({ required: true, maxLength: 20 })}
            placeholder="Username"
          ></input>
          <input
            type="password"
            name="password"
            ref={register({ required: true, maxLength: 20 })}
            placeholder="Password"
          ></input>
          <input type="submit" value="LOGIN"></input>
          <button onClick={() => setModalOpen(!openModal)}>
            Create an account
          </button>
        </form>
      </div>
      <Register
        openModal={openModal}
        setModalOpen={setModalOpen}
        responseMessage={responseMessage}
        setResponseMessage={setResponseMessage}
      />
    </>
  );
}

export default LoginComponent;
