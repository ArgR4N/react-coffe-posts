import * as Icon from 'react-bootstrap-icons'
import CommentForm from './CommentForm'
import { useState } from 'react';
import { Link } from 'react-router-dom'
const Comment = ({comment, selectedPost, setSelectedPost, sessionUsername}) =>{
    console.log(comment.user);
    const { msg, user } = comment
    const { username, userIcon }  = user
    return( <li className="bg-white my-2 p-2 d-flex flex-column align-items-start gap-3"> 
    <Link 
        to={`/Profile/${username}`} 
        style={{ width:'100px', height:'45px'}} 
        className='btn-main btn p-3 d-flex align-items-center justify-content-center  gap-2 rounded'> 
            <img className='w-75' src={userIcon} alt='user-icon' />  
            <p className='m-0' style={{color:'var(--detail-color)'}} > {username}</p>
    </Link>
    {msg}

     </li> )
}

export default Comment