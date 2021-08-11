import Post from './components/Post'
import PostForm from './components/PostForm'
const Home = ( {postsList, addPost, deletePost, updatePost, user, savePost} ) =>{
  return(
      <main className='d-flex flex-row justify-content-center'>

        <section className='mainSection'>
          <div className='d-flex justify-content-center w-100'>
            <PostForm
            addPost={addPost} 
            username={user ? user.username : false} 
            />
          </div>
          <div className='mt-3 postsContainer'>
            {postsList.map(post =>(
              <Post
              savePost={savePost}
              key={post._id}
              updatePost={updatePost}
              title={post.title}
              text={post.text}
              deletePost={deletePost}
              id={post._id}
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