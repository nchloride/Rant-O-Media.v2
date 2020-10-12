import React, { useEffect, useRef, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import LoadingAnimation from "../design/loading.animation.component"
import  ProfileDetails  from "./profile-details.component";
export const ProfileInfo = () => {
  const [onEdit, onEditClicked] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const [defaultUser, setDefaultUser] = useState({});
  const [tempDefaultPicture, setTempDefaultPicture] = useState("");
  const [loading,setLoading] = useState(false);
  const userInfo = () => {
    return {
      fullname: defaultUser.fullname,
      email: defaultUser.email,
      address: defaultUser.address,
      _id: defaultUser._id,
    };
  }
  useEffect(() => {
    let isMounted = true;
    setLoading(true)
    const getUserInformation = async () => {
      await axios
        .get("/islogin")
        .then((resp) => resp.data)
        .then((data) => data.data)
        .then((result) => {
          isMounted &&( () => { setUserInformation(result[0]);
           setDefaultUser(result[0]); setLoading(false)}
          )()
        });
    };
    getUserInformation();
    return () => (isMounted = false);
  }, []);
  const { handleSubmit, register } = useForm();
  const handleEdit = async (data) => {
    data._id = userInformation._id;
    console.log(data);

    JSON.stringify(userInfo) !== JSON.stringify(data)
      ? await axios
          .put("/profile/editprofile", data)
          .then((res) => onEditClicked(false))
      : onEditClicked(false);
  };
  const handleImageChanged = async (e) => {
    setTempDefaultPicture(URL.createObjectURL(e.target.files[0]));
    let formData = new FormData();
    formData.append("picture", e.target.files[0]);
    formData.append("_id", userInformation._id);
  
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // let formData2 = new FormData();

    // formData2.append('pictureName',userInformation.profilePicture)
    // await axios.delete("/profile/deletepicture",formData2).then(res=>console.log('image delete result: ',res));
    await axios.post("/profile/uploadpicture", formData, config);
  };
  const handleProfilePictureRoute =()=>{
 return Object.keys(userInformation).length!==0 && userInformation.profilePicture!==undefined? require(`../pictures-uploads/${userInformation.profilePicture}`):require("./default.jpg")
 }
  return loading? <LoadingAnimation/>: (
    <div className="profile-userinfo">
      {userInformation && onEdit ? (
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="profile-userinfo-edit"
          encType="multipart/form-data"
        >
          <img src={ handleProfilePictureRoute() } />
          <input
            type="text"
            name="fullname"
            ref={register({ required: true })}
            value={userInformation.fullname}
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                fullname: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="email"
            ref={register({ required: true })}
            value={userInformation.email}
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                email: e.target.value,
              })
            }
          />

          <input
            type="text"
            name="address"
            ref={register({ required: true })}
            value={userInformation.address}
            onChange={(e) =>
              setUserInformation({
                ...userInformation,
                address: e.target.value,
              })
            }
          />
          <button type="submit">
            <EditIcon /> Edit
          </button>
        </form>
      ) : (
        <div className="profile-userinfo-display">
          <img
            src={ tempDefaultPicture || handleProfilePictureRoute() }
          />
          <input
            type="file"
            name="picture"
            accept="image/png ,image/jpeg, image/gif"
            onChange={handleImageChanged}
          ></input>

          <div className="info">
          <ProfileDetails fullname={userInformation.fullname} email={userInformation.email} address={userInformation.address}/>
            <button onClick={() => onEditClicked(true)}>
              {" "}
              <EditIcon />
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
