import React,{useState,useEffect} from 'react'


const useIsFollow = (username,followList ) => {
    function followValidator(username,followList){
        if( followList !==undefined){
            const followed = followList.find(follow => follow.username === username);
            if(followed){
                return true
            }
            else{
                return false
            }
        }
        return false
    }
    const [isFollowed,setIsFollowed] = useState();
    useEffect(()=>{
        console.log(username,followList);
     followValidator(username,followList || []) ? setIsFollowed(true) : setIsFollowed(false)
    },[followList])

    return [isFollowed,setIsFollowed]
}

export default useIsFollow