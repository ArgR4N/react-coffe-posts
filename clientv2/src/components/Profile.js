import { useEffect, useState } from 'react';
import { Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import Post from './Post'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import * as Icon from 'react-bootstrap-icons';
import toast from 'react-hot-toast';

const Profile = ({user, logOutFunction}) =>{
    const [userPostsList, setUserPostsList] = useState([])
    const [msgState, setMsgState] = useState(true)
    const [savedPosts, setSavedPosts] = useState(user ? user.savedPosts : [])
    const [shwowingSaved, setShwowingSaved] = useState(false)
    const [newDescription, setNewDescription] = useState({description:user ? user.description : '', editing:false})

    useEffect(() =>{
        if (user){
            axios.get(`/api/user=${user.username}/posts`)
            .then(res => {
                setUserPostsList(res.data.postsList)
                })
            let newSavedPost = []
            savedPosts.forEach(postId => {
                axios.get(`/api/posts/${postId}`)
                .then(res => {
                    newSavedPost.push(res.data);
                })
            });
            setSavedPosts(newSavedPost)
        }
    }, [user])


    const renderNoPost = () =>{
        setTimeout(() => {setMsgState(false)}, 2000)
        return(
            msgState ? <Spinner className='mt-5' animation='border'></Spinner> : <h3 style={{textAlign:'center'}}>Any Post Yet</h3>
        )
    }

    const handleEditingClick = _ =>{
        setNewDescription(prev => ({...prev, editing:!prev.editing}))
    }

    const handleSaveEdit = _ =>{
        if (user.description === newDescription.description) toast.error('No change made')
        else if (newDescription.description.length > 550){
            toast.error('The description have a 550 max!')
        }else{
            let promise = axios.put(`/api/users/${user.id}`, {description:newDescription.description})
                .then(res =>{
                    setNewDescription(prev => ({...prev, editing:false}))
                })
            toast.promise(promise, {
                loading:'Updating...',
                success:'Edited!',
                error:'Error!'
            })
        }
    }

    const renderProfileSection = () =>{
        return (
            <div style={{width:'100vw', margin:'0 auto'}} className='profileSection'>
                <ul className='userPosts'>
                    <button style={{color:'white'}} onClick={_ => shwowingSaved && setShwowingSaved(false)} className={`btn btn-second${!shwowingSaved ? '' : 'ary'} my-2 mx-1`}>Your Posts</button>
                    <button onClick={_ => shwowingSaved || setShwowingSaved(true)} className={`btn btn-second${shwowingSaved ? '' : 'ary'} my-2 mx-1`}>Saved Posts</button>
                    {shwowingSaved 
                    ? savedPosts[0] 
                        ? savedPosts.map(post =>(
                            <Post
                            inUser={true}
                            key={post._id}
                            title={post.title}
                            text={post.text}
                            id={post._id}
                            username={post.user}
                            coffees={post.likes}
                            postForum={post.forum}
                            sessionUsername={user ? user.username : ''}
                        />
                        )) 
                        : <h3 style={{textAlign:'center'}}>Any Saved Post Yet</h3>
                    : userPostsList.length > 0 
                        ? userPostsList.map(post =>(
                            <Post
                            inUser={true}
                            key={post._id}
                            title={post.title}
                            text={post.text}
                            postForum={post.forum}
                            id={post._id}
                            username={post.user}
                            coffees={post.likes}
                            sessionUsername={user ? user.username : ''}
                            />
                        ))
                        : renderNoPost()}

                </ul> 
                <section className='userInfo'>
                    <h3> {user.username} 
                    <button onClick={() => logOutFunction()} className='logout'><Icon.DoorClosed/></button> 
                    </h3> 
                    <div className='descriptionSection'>
                        <textarea disabled={!newDescription.editing} onChange={e => setNewDescription(prev => ({...prev, description:e.target.value}))} value={newDescription.description} className='form-control' placeholder='Description'></textarea>
                        <div style={{minWidth:'50px', width:'25%'}}>
                            {newDescription.editing 
                            ? <div>
                                <button onClick={handleSaveEdit}>
                                    <Icon.CheckLg/>
                                </button>
                                <button onClick={handleEditingClick}>
                                    <Icon.XLg/>
                                </button>
                            </div> 
                            : <button onClick={handleEditingClick}>
                                <Icon.PencilFill/>
                            </button>}
                        </div>
                    </div>
                        <h3>Forums:</h3>
                    <div style={{minHeight:'50vh'}} className=' d-flex flex-column overflow-auto'>
                        {user.forums && user.forums.length > 0 
                        ? user.forums.map(forum => <Link className='my-1 mx-3 d-flex alig-items-center card px-3 py-2' to={`/Forum/${forum}`}> <h4>{forum}</h4> </Link>)
                        : <h3 style={{textAlign:'center'}}> Any forum </h3>}
                    </div>
                </section>
            </div>
        )
    }

    return user ? renderProfileSection() : <Redirect to='/LogIn' />
}

export default Profile;