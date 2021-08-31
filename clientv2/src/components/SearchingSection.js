import { useParams } from "react-router-dom";
import { useState } from "react";
import Post from './Post'
const SearchingSection = ({postsList, forums}) =>{
    const { search }  = useParams()
    const [showingPosts, setShowingPosts] = useState(true)
    const [founded, setFounded] = useState({posts:postsList, users:[]})

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
                    <h4>Posts</h4>
                    <ul className='m-0 p-0'>
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
                    <h4>Users</h4>

                </section>
            </div>
        </main>
    );
}

export default SearchingSection;