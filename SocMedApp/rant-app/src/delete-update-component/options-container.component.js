import React from 'react'
import "./options.css"
export const OptionsContainer = ({setEditEnabled,handleDelete}) => {
    return (
    <div className="options-container">
            <button onClick={()=>setEditEnabled(true)} >edit</button>
            <button onClick={handleDelete}>delete</button>
    </div>
    )
}
