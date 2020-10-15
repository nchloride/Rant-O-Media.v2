import React from 'react'
import { useForm } from 'react-hook-form'

export const CommentForm = ({handleCommentSubmit,icon}) => {
    const {handleSubmit,register}= useForm()
    return (
    <form className="comment-form" onSubmit={handleSubmit(handleCommentSubmit)}>
        <img src={require(`../icon/${icon}`)}></img>
        <input type="text" name="comment" ref={register({required:true})} placeholder="Write a comment..."></input>
    </form>
    )
}
