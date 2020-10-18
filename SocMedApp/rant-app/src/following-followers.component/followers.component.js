import React from 'react'

const Followers = ({followers}) => {
    return (
        <div className="followers">
            {followers?.map(follower=>
            <div>
                <section>
                    <h1>{follower.name}</h1>
                    <h2>{follower.username}</h2>
                </section>
            </div>)
            }
        </div>
    )
}

export default Followers
