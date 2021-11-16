import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner'
import Post from '../Posts/Post'
import axios from 'axios';
import * as Icon from 'react-bootstrap-icons'

const SelectedProfile = _ =>{
    const { user } = useParams();
    const [selectedUser, setSelectedUser] = useState(null)
    const [msgState, setMsgState] = useState(false)
    const [userPostsList, setUserPostsList] = useState([])
    useEffect(() =>{
        axios.get(`/api/user/${user}`)
            .then(res => setSelectedUser(res.data));
        axios.get(`/api/user=${user}/posts`)
        .then(res => {
            setUserPostsList(res.data.postsList)
        })
    }, [user])
    
    const renderNoPost = () =>{
        setTimeout(() => {setMsgState(false)}, 2000)
        return(
            msgState ? <Spinner className='mt-5' animation='border'></Spinner> : <h5>Any posts...</h5>
        )
    }

    const renderSelectedUser = _ =>{
        return(
            <div style={{width:'100vw', margin:'0 auto'}} className='profileSection'>
            {userPostsList.length !== 0
            ?                
            <ul className='userPosts'>
                {userPostsList.map(post =>(
                    <Post
                    inUser={true}
                    key={post._id}
                    title={post.title}
                    text={post.text}
                    id={post._id}
                    username={post.user}
                    coffees={post.likes}
                    sessionUsername={user ? user.username : ''}
                />
                ))}
            </ul> 
            : renderNoPost()
            }
            <section className='userInfo'>
            <div className='d-flex flex-column align-items-center'>
                        <img style={{width:'100px'}} alt='user-avatar' src={selectedUser.userIcon}></img>
                        <h3> 
                            {selectedUser.username} 
                        </h3>
                    </div> 
                <h6>Description:</h6>
                <textarea disabled className='form-control' ></textarea>
                <h3>Forums:</h3>
                    <div style={{height:'45%'}}  className=' d-flex flex-column overflow-auto'>
                        {selectedUser.forums && selectedUser.forums.length > 0 
                        ? selectedUser.forums.map(forum => (
                        <Link className='my-1 mx-3 d-flex alig-items-center card px-3 py-2' to={`/Forum/${forum}`}>
                            <h4>{forum}</h4>
                            <button className='btn btn-main'>Join <Icon.Play/> </button>
                        </Link>))
                        : <h3 style={{textAlign:'center'}}> Any forum </h3>}
                    </div>
            </section>
            
        </div>
        )
    }

    return(
        selectedUser ? renderSelectedUser() : <h2 style={{textAlign:'center'}}> There is no user!</h2>
    )
}

export default SelectedProfile;