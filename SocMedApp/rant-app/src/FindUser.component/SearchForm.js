import React from 'react'
import {useForm} from "react-hook-form"
const SearchForm = ({handleUserSearch}) => {
    const {handleSubmit,register} = useForm();
    return (
        <form className="find-user__search_bar" onSubmit={handleSubmit(handleUserSearch)}>
                <input placeholder="Search user" name="fullname" ref={register({required:true})}></input>
        </form>
    )
}

export default SearchForm
