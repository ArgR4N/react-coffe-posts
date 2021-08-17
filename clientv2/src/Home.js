import Post from './components/Post'
import PostForm from './components/PostForm'
const Home = ( {postsList, addPost, deletePost, updatePost, user, savePost, forums} ) =>{
  const setSavedFunction = (postId) =>{
    let state = false;
    user.savedPosts.forEach(id => id === postId ? state = !state : null )
    return state
  }

  return(
      <main className='d-flex flex-row justify-content-center'>

        <section className='mainSection'>
          <div className='d-flex justify-content-center w-100'>
            <PostForm
            addPost={addPost} 
            username={user ? user.username : false} 
            user={user}
            forums={forums}
            />
          </div>
          <div className='mt-3 postsContainer'>
            {postsList.map(post =>(
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
            ))}
          </div>
        </section>
      </main>

    )
}

export default Home;