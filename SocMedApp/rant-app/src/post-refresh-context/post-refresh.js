import React,{createContext,useState} from 'react'

export const RefreshPost = createContext();
export const PostRefresh = (props) => {
    const [refreshPost,setRefreshPost] = useState(false);
    return (
        <RefreshPost.Provider value={[refreshPost,setRefreshPost]}>
            {props.children}
        </RefreshPost.Provider>
    )
}
