import React from 'react'

const Following = ({following}) => {
    return (
        <div className="follow">
            {following && following?.map((following,id)=>
                <div key={id} className="follow__container">
                    <img src={require(`../icon/${following.icon}`)}></img>
                    <section>
                        <h1>{following.fullname}</h1>
                        <h2>{following.username}</h2>
                    </section>
                </div>)
            }
        </div>
    )
}

export default Following
