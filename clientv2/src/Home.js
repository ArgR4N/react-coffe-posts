import Post from './components/Posts/Post'
import PostForm from './components/Posts/PostForm'

import * as Icon from 'react-bootstrap-icons'

import { useEffect, useState } from 'react'

const Home = ( {postsList, addPost, deletePost, updatePost, user, savePost, forums} ) =>{
  const setSavedFunction = (postId) =>{
    let state = false;
    user.savedPosts.forEach(id => id === postId ? state = !state : null )
    return state
  }
  const [forumPostsList, setForumPostsList] = useState([])
  const [showForumOnly, setShowForumOnly] = useState(true)
  useEffect(() => {
    console.log(user ? user.forums : '');
    let newList = [];
    if(postsList.length > 0 && user){
      user.forums.forEach(forum =>{
        postsList.forEach(p =>{
          if(p.forum === forum) newList.push(p)
        })
      })
      setForumPostsList(newList)
      console.log(forumPostsList);
    }
  }, [postsList, user])
  const renderPost = post =>(
   <Post
    inUser={false}
    savePost={savePost}
    isSaved={user ? setSavedFunction(post._id) : false}
    key={post._id}
    updatePost={updatePost}
    title={post.title}
    text={post.text}
    deletePost={deletePost}
    id={post._id}
    postForum={post.forum}
    username={post.user}
    coffees={post.likes}
    sessionUsername={user ? user.username : ''}
    />
  )

  return(
      <main className='d-flex flex-row justify-content-center'>

        <section className='mainSection'>
          <div style={{margin:'0 auto'}} className='d-flex justify-content-center w-75'>
            <PostForm
            addPost={addPost} 
            username={user ? user.username : false} 
            user={user}
            forums={forums}
            />
          </div>
          <section style={{margin:'0 auto'}} className={`btnPosts ${user ? '' : 'd-none'} d-flex align-items-center w-75 gap-2`}>
            <button 
            onClick={_ => setShowForumOnly(true)} 
            className={`d-flex align-items-center gap-1 btn btn-${showForumOnly ? 'main' : 'secondary'}`}>
              {showForumOnly ?  <Icon.XDiamondFill/> : <Icon.XDiamond/>}    
              <small>Your Forum´s </small>
            </button>
            <button 
            onClick={_ => setShowForumOnly(false)} 
            className={`d-flex align-items-center gap-1 btn btn-${!showForumOnly ? 'main' : 'secondary'}`}>
              {showForumOnly ?  <Icon.Layers/> : <Icon.LayersFill/>}    
              All
            </button>
          </section>
          <div className=' postsContainer'>
            {showForumOnly && forumPostsList.map(post =>renderPost(post))}
            {!showForumOnly && postsList.map(post =>renderPost(post))}
          </div>
        </section>
      </main>

    )
}

export default Home;