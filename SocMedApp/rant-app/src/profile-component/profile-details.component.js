import React from 'react'

 const ProfileDetails = ({fullname,email,address}) => {

    return (
        <>
            <h1>{fullname}</h1>
            <h2>{email}</h2>
            <h3>{address}</h3>
        </>
    )
}

export default ProfileDetails;