import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Post from './Posts/Post'
import {Link} from 'react-router-dom'
const SearchingSection = ({postsList, users}) =>{
    const { search }  = useParams()
    const [showingPosts, setShowingPosts] = useState(true)
    const [founded, setFounded] = useState({posts:[], users:[]})


    useEffect(() => {
        let postsFoundsList = [];
        let usersFoundsList = [];
        postsList.forEach(post => {
            console.log(post.title.toLowerCase().includes(search.toLowerCase()) && postsFoundsList.push(post))
            post.title.toLowerCase().includes(search.toLowerCase()) && postsFoundsList.push(post)
        });
        users.forEach(user => {
            console.log(user.username.toLowerCase().includes(search.toLowerCase()))
            user.username.toLowerCase().includes(search.toLowerCase()) && postsFoundsList.push(user)
        });
        setFounded({posts:postsFoundsList, users:usersFoundsList})
    }, [search, postsList, users])

    return(
        <main> 
            <div className='bg-white p-2'>
                <h3>{search}</h3>
                <h6>Founded posts and users:</h6>
            </div>
            <div className='d-flex gap-2 p-2'>
                <button onClick={() => setShowingPosts(true)} className={`btn btn-second${showingPosts ? '' : 'ary'}`}>Posts</button>
                <button onClick={() => setShowingPosts(false)} className={`btn btn-second${!showingPosts ? '' : 'ary'}`} >Users</button>
            </div>
            <div className='d-flex'>
                <section style={showingPosts ? {}  : {display:'none'}} className='w-100 mx-3' >
                    <h4>Posts:</h4>
                    <ul style={{margin:'0 auto'}} className='m-0 p-0 d-flex flex-column align-items-center'>
                        {founded.posts.map( post =>(
                            <Post 
                            key={post._id}
                            title={post.title}
                            text={post.text}
                            id={post._id}
                            postForum={post.forum}
                            username={post.user}
                            coffees={post.likes}
                            />
                        ))}
                    </ul>
                </section>

                <section className='w-100 mx-3' style={!showingPosts ? {}  : {display:'none'}}>
                    <h4>Users:</h4>
                    <ul style={{margin:'0 auto'}} className='m-0 p-0 d-flex flex-row gap-3 align-items-center'>
                    {founded.users.map(user => 
                        <Link style={{width:'150px'}} className='bg-white  card d-flex align-items-center p-1 gap-1'>
                            <img style={{width:'45px', border:'3px solid var(--main-color)', borderRadius:'30px'}} alt='user-avatar' src={`https://avatars.dicebear.com/api/jdenticon/${user.username}.svg`}></img>
                            {user.username} 
                        </Link> )}
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default SearchingSection;