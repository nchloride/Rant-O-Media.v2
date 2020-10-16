import React from 'react'
import "./options.css"
export const OptionButton = ({setOptionsOpen}) => {
   
    
    return (
        <button onClick={()=>setOptionsOpen(prevData=>!prevData)} className="options-button">
                <div className="dot" >
                </div>
                <div className="dot">
                </div>
                <div className="dot">
                </div>
        </button>
    )
}
