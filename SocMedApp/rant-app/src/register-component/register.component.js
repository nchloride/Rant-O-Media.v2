import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
    width: "500px",
  },
};
Modal.setAppElement("body");
export default function Register({
  openModal,
  setModalOpen,
  responseMessage,
  setResponseMessage,
}) {
  const [userProfile, setUserProfile] = useState();
  const icons = ['giraffe','penguin','elephant','wolf','panda','cheetah','bear','monkey','lion']
  const { handleSubmit, errors, register, reset } = useForm();

  const onRegister = async (data) => {
    console.log(data);
    await fetch("/register", {
      mode: "cors",
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        fullname: data.fullname,
        email: data.email,
        address: data.address,
        icon:data.icon
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponseMessage(data.message);
        reset();
      })
      .catch((err) => console.log(err));
  };
  return (
    <Modal style={customStyles} isOpen={openModal}>
      <form
        onSubmit={handleSubmit(onRegister)}
        className="register--modal-form"
        encType="multipart/form-data"
      >
        <button
          onClick={() => {
            setModalOpen(!openModal);
            setResponseMessage("");
          }}
          className="close-button"
        >
          X
        </button>
        <h1>REGISTER NOW DUMMY DUMB</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={register({ required: true, minLength: 8 })}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          ref={register({ required: true, minLength: 8 })}
        ></input>
        <input
          type="text"
          name="fullname"
          placeholder="Fullname"
          ref={register({ required: true })}
        ></input>
        <input
          type="text"
          name="address"
          placeholder="Address"
          ref={register({ required: true })}
        ></input>
        <input
          type="text"
          name="email"
          placeholder="Email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
          })}
        ></input>
        <div className="radio-buttons">
        {icons.map((icon,id)=> (<div className="radio-inputs" key={id}>
            <img src={require(`../icon/${icon}.png`)}></img>
           <input type="radio" name="icon" value={icon + '.png'}  ref={register({required:true})} />
            </div>))}
        </div>
     
        {responseMessage}
        {errors?.picture && "Image size limit:20mb"}
        <button type="submit" className="create-account">
          CREATE ACCOUNT
        </button>
      </form>
    </Modal>
  );
}
