import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import Post from './Post'
import PostForm from './PostForm'
const SelectedForum = (props) =>{
    const { forum } = useParams();
    const [selectedForum, setSelectedForum] = useState({name:'', description:'', users:[]})
    const [forumPosts, setForumPosts] = useState([])
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
    }, [forum])
    const {name, description, users} = selectedForum
    return(
        <main className='selectedForum'>
            <section className='selectedForumInfo'>
                <div className='d-flex gap-2 p-1'> <h2  className='d-inline-block p-0'>{name}</h2> <button className='btn btn-info'>Join</button> </div>
                <ul>
                    {users.map(user => <h3> user </h3>)}
                </ul>
                        {/* <button  to='/Forums' className={`btn btn-info 'btn-second'`}>
                Post 
                <Icon.CursorFill/>
            </button> */}
            </section>
            <section style={{margin:'0 auto'}} className=' w-75 d-flex justify-content-between'>
                <article className='w-75'>
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
                <article className='card my-2 p-2 w-25' style={{backgroundColor:'white'}}> 
                    <h5 className=''>About the forum:</h5>
                    {description}
                </article>
            </section>
        </main>
    )
}

export default SelectedForum;