import React,{useState} from 'react'
import { useForm } from 'react-hook-form'

export const CommentForm = ({handleCommentSubmit,icon,value}) => {
    const {handleSubmit,register}= useForm()
    const [newComment,setNewComment] = useState(value)
    return (
    <form className="comment-form" onSubmit={handleSubmit(handleCommentSubmit)}>
        <img src={require(`../icon/${icon}`)}></img>
        {!value?
        <input 
            type="text"
            name="comment"
            ref={register({required:true})}
            placeholder="Write a comment...">
        </input>:
        <input 
          type="text"
          name="comment"
          ref={register({required:true})}
          value={newComment}
          onChange={(e)=>setNewComment(e.target.value)}
          placeholder="Write a comment...">
      </input>
        }
    </form>
    )
}
