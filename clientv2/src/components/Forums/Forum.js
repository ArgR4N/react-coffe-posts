import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons'
import toast from 'react-hot-toast';
import { useState,useEffect } from 'react';
const Forum = ({forum, user, setShowForm, setClickedForum, unJoinFunction, joinFunction}) =>{
    const {name, description} = forum
    const [isJoined, setIsJoined] = useState(false)
    const handlePostClick  = _ =>{
        setShowForm(prev => !prev)
        setClickedForum('name')
    }

    useEffect(() =>{
        if(user){
            user.forums.forEach(forum =>{
                if (forum === name) {
                    setIsJoined(true)
                }
            })
        }
    }, [name, user])

    const handleJoinClick  = _ =>{
        joinFunction(name, setIsJoined)
    }
    const handleUnJoinClick  = _ =>{
        unJoinFunction(name, setIsJoined)
    }
    return (
        <Link to={`/Forum/${name}`} >
            <main  className='forum'>
                <h2> {name} </h2>
                <p> {description} </p>
            </main>
            <div  className='forumBtnContainer'>
            {isJoined 
            ?                
            <Link to='/Forums' onClick={user ? handleUnJoinClick : () => toast.error('You need to be logged in!')} className={`btn ${user ? isJoined ? 'btn-danger' : 'btn-main' : 'btn-secondary'}`}>
                UnJoin
                <Icon.PlayFill/>
                </Link>
            :     
            <Link to='/Forums' onClick={user ? handleJoinClick : () => toast.error('You need to be logged in!')} className={`btn ${user ? isJoined ? 'btn-danger' : 'btn-main' : 'btn-secondary'}`}>
                Join
                <Icon.Play/>
            </Link>}
                <Link  to='/Forums' onClick={user ? handlePostClick : () => toast.error('You need to be logged in!')} className={`btn ${user ? 'btn-main' : 'btn-secondary'}`}>
                    Post 
                    <Icon.CursorFill/>
                </Link>
            </div>
    </Link>
    )
}

export default Forum;