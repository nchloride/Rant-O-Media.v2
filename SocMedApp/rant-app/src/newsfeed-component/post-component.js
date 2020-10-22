import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { CommentsLikes } from '../comments.component/CommentsLikes.component';
import { PostDetails } from './post-details.component';

const Post =(props)=>{
    const {username,post,feeling,fullname,date,likes,local_id,icon} = props.post;
    const [comments,setComments] = useState([]);
    const [refresh,setRefresh] = useState(false);
    useEffect(() => {
      let isMounted = true
      const getComments = async()=>{
        await axios.get(`/newsfeed/api/comments/${local_id}`)
        .then(result => {
          if(isMounted)
            setComments(result.data);
            setRefresh(false);
        })
      }
      getComments();
      return ()=> isMounted = false
    }, [!refresh])
  return (
    <div className='post' >
      <PostDetails username={username} post={post} feeling={feeling} fullname={fullname} date={date} icon={icon} local_id={local_id}/>
      <CommentsLikes likes={likes} comments={comments} local_id={local_id} setRefresh={setRefresh}/>
    </div>
  )
}
export default React.memo(Post)