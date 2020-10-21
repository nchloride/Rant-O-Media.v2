import React from 'react'

const Followers = ({followers}) => {
    return (
        <div className="follow">
            {followers && followers?.map((follower,id)=>
                <div key={id} className="follow__container">
                     <img src={require(`../icon/${follower.icon}`)}></img>
                    <section>
                        <h1>{follower.fullname}</h1>
                        <h2>{follower.username}</h2>
                    </section>
                </div>)
            }
        </div>
    )
}

export default Followers
