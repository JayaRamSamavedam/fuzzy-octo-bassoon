import React from 'react'
import JoditEditor from "jodit-react"
import { useRef,useState } from 'react'
import Appbar from "./NavBar";
const Posts = () => {
  const editor = useRef(null)
  const [content,setcontent] =useState('')
    const User=window.localStorage.getItem('user')
    const token = window.localStorage.getItem('auth_token')
    // if(token){
  
    const contentFieldChanaged = (data) => {
      // setPost({ ...post, 'content': data })
      setcontent(data)
      console.log(data)
    }
    return (
    <div>
      <Appbar/>
 <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={(newContent) => contentFieldChanaged(newContent)}
                            />
    </div>
  )}
  // else{
  //   return (
  //     <div className='text-center text-9xl font-extrabold'>Please Login</div>
  //   )
  // }
// }

export default Posts