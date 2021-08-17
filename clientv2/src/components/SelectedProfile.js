import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from 'react-bootstrap/Spinner'
import Post from './Post'
import axios from 'axios';
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
                <h3> {selectedUser.username} </h3>
                <h6>Description:</h6>
                <textarea disabled className='form-control' ></textarea>
                <h3>Forums:</h3>
                {user.forums && user.forums.length > 0 
                ? user.forums.map(forum => <div> {forum} </div>)
                : <h3 style={{textAlign:'center'}}> Any forum</h3>}
            </section>
            
        </div>
        )
    }

    return(
        selectedUser ? renderSelectedUser() : <h2 style={{textAlign:'center'}}> There is no user!</h2>
    )
}

export default SelectedProfile;