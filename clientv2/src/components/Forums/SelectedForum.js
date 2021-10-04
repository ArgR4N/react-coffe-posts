import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Post from '../Posts/Post'
import PostForm from '../Posts/PostForm'
import * as Icon from 'react-bootstrap-icons'
const SelectedForum = ({user, setUser, forums}) =>{
    const { forum } = useParams();
    const [selectedForum, setSelectedForum] = useState({name:'', description:'', users:[]})
    const [forumPosts, setForumPosts] = useState([])
    const [isJoined, setIsJoined] = useState(false)
    useEffect(() =>{
        axios.get(`/api/forums/${forum}`)
            .then(res =>{
                res.data.name
                ? setSelectedForum(res.data)
                : <Redirect to='/Home' />
            })
        axios.get(`/api/forum=${forum}/posts`)
            .then(res =>{
                setForumPosts(res.data.postsList)
            })
        if(user){
            user.forums.forEach(forum =>{
                if (forum === selectedForum.name) setIsJoined(true) 
        })
        }
    }, [forum, user])

    const joinFunction = (forum) =>{
        axios.put(`/api/users/${user.username}`, {forums:[...user.forums, forum]})
        .then(res => {
            if(res.data.state){
                setIsJoined(true)
                setUser(res.data.newUser)
            }
        })
    }

    const unJoinFunction = (forum) =>{
        let forums = user.forums
        console.log(forums)
        forums.splice(user.forums.indexOf(forum), 1);
        console.log(forums)
        axios.put(`/api/users/${user.id}`, {forums})
        .then(res => setIsJoined(false))
    }

    const {name, description, users} = selectedForum

    const handleJoinClick = _ =>{
        isJoined
        ? user && unJoinFunction(name, isJoined, user, setUser) 
        : user && joinFunction()
    }
    return(
        <main className='selectedForum'>
            <section className='selectedForumInfo'>
                <div className='d-flex gap-2 p-1'>
                    <h2  className='d-inline-block p-0'>{name}</h2> 
                    <button onClick={handleJoinClick} className={`btn btn-${isJoined ? 'danger' : 'main'} d-flex align-items-center gap-1`}>
                    {isJoined ? 'UnJoin' : 'Join'}
                    {isJoined ? <Icon.PlayFill/> : <Icon.Play/>}
                    </button> 
                </div>
                <ul>
                    {users.map(user => <h3> user </h3>)}
                </ul>
            </section>
            <section style={{margin:'0 auto'}} className='selectedForumContent d-flex justify-content-between'>
                <article className='w-75'>
                    <div style={{padding:'-50px'}} className='mx-3 d-flex justify-content-center'>
                        <PostForm 
                            user={user} 
                            forums={forums} 
                            clickedForum={forum}
                        />
                    </div>
                        {forumPosts.length > 0 
                    ? 
                    <ul className='w-100' >
                        {forumPosts.map(post => (
                            <div className='d-flex justify-content-center '>
                                <Post
                                key={post._id}
                                title={post.title}
                                text={post.text}
                                id={post._id}
                                username={post.user}
                                coffees={post.likes}
                                postForum={post.forum}
                                inForum={true}
                                />
                            </div>
                        ))}
                    </ul>
                    : <h2  style={{textAlign:'center'}}>Any post</h2>}
                </article>
                <article className='card my-2 p-2 w-25' style={{backgroundColor:'white', maxHeight:'200px'}}> 
                    <h5 className=''>About the forum:</h5>
                    <span className='overflow-auto'>
                    {description}
                    </span>
                </article>
            </section>
        </main>
    )
}

export default SelectedForum;