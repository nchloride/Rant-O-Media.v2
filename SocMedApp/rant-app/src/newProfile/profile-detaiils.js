import React from 'react'

export const ProfileDetails = (props) => {
    const {fullname,username,address,email,icon} = props.userData;
    return (
        <div className="profile__details">
            <img src={icon?require(`../icon/${icon}`):require('../icon/monkey.png')}></img>
            <h1>{fullname}</h1>
            <h2>{`@${username}`}</h2>
            <p>{address}</p>
            <small>{email}</small>
        </div>
    )
}
