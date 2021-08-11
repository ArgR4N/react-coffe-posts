import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import * as Icon from 'react-bootstrap-icons';
import toast, { Toaster } from 'react-hot-toast';
//Components =>
import Home from './Home'
import NavBar from './components/NavBar';
import SelectedPost from './SelectedPost'
import Forums from './components/Forums'
import LogInForm from './components/LogInForm'
import RegisterForm from './components/RegisterForm'
import SelectedForum from './components/SelectedForum';
//Components <=
//Routes =>
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Profile from './components/Profile';
//ROutes <=
const App = () => {
  const [forums, setForums] = useState([])
  const [postsList, setPostsList] = useState([])
  const [user, setUser] = useState(null)
  const [navBarOpen, setNavBarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect( () =>{
    //Fetch de los posts
    axios.get('/api/posts')
    .then(res =>{
      setPostsList(res.data.posts)
    })
    //Fetch de los forums
    axios.get('/api/forums')
    .then(res => {
      setForums(res.data.forums)
    })
    //Fetch de los users
    axios.get('/api/user')
    .then(res =>{
      if (!res.data.msg) {
        setUser(res.data)
        toast.success(`Welcome back ${res.data.username}!`, {duration:1500})
      }else{
        return null;
      }
    })
  }, [])
  
  const addPost = (post) =>{
    const addPostPromise = axios.post('/api/posts', post)
      .then(res => {setPostsList(prevState => [res.data, ...prevState])});
    toast.promise(addPostPromise, {
      loading:'Posting...',
      success:'Posted!',
      error:res =>`This happened:${res}`
    })
  };

  const deletePost = (id) =>{
    let newPostList = []
    const deletePromise = axios.delete(`/api/posts/${id}`)
      .then(res =>{
        postsList.forEach(post => post._id === id ? null : newPostList.push(post));
        setPostsList(newPostList);
      });
      toast.promise(deletePromise,{
        loading: 'Deleting...',
        success: `Successfully deleted`,
        error: (err) => `This just happened: ${err.toString()}!`,
      })
  }

  const updatePost = (id, newPost) =>{
    const loadingToast = toast.loading('Updating...')
    const updatePostPromise = axios.put(`/api/posts/${id}`, newPost)
      .then(res => {
        toast.dismiss(loadingToast)
        if(res.data[0]){
          setPostsList(prevState => prevState.map(post => post._id !== id ? post : res.data))
        } 
        toast.success('Successfully updated!')
      })
    if(!newPost.likes){
      toast.promise(updatePostPromise, {
        loading:'Updating...',
        success:'Updated!',
        error:res => `This happened: ${res}`
      })
    }
  
    }


  //User functions
  const logInFunction = (user) =>{
      const logInPromise = axios.post('api/login', user)
        .then(res => {
          const [state, user] = res.data
          console.log(state, user);
          const {username, _id, createdAt, savedPosts} = user
          const userWrongFunction = () =>{
            setUser(null);
            toast.error('Username or Password wrong!')
          }
          state 
            ? setUser({username, id:_id, createdAt, savedPosts})
            : userWrongFunction()
        })
      //Toast
      toast.promise(logInPromise, {
        loading:'Login in...',
        error: 'User or Password are wrong!',
        success:'Logged'
      })
  }  
  const registerFunction = (user) =>{
    if (user.username !== '' && user.password !== '') {
      const registerPromise = axios.post('api/register', user)
      //Toast
      toast.promise(registerPromise, {
        loading:'Registering...',
        success:res => `${res.data}`,
        error:'User alredy exist!'
      })
    }else{
      //Toast
      
    }
  }
  const logOutFunction = () =>{
    axios.get('/api/logout')
      .then(() => {
        setUser(null)
        toast('Logged Out!', {icon:'👌'});
      })
  }
  
  const savePost = postId =>{
    axios.put(`/api/users/${user ? user.id : 'none'}`, {postId, savedPosts:user.savedPosts})
      .then(res => console.log(res))
  }

  const [displayShow, setDisplayShow] = useState(false)
  const handleClick = e =>{
    if (e.target.classList[0] !== 'navItem') {
      setDisplayShow(false)
    }
  }

  const createForm = newForm =>{
    const createFormPromise = axios.post('/api/forums', newForm)
      .then(res => {
        if(res.data) {
          setForums(prev => [...prev, res.data[1]])
          setShowModal(false)  
        }
      })
    toast.promise(createFormPromise, {
      loading:'Creating form...',
      success:'Forum created!',
      error:'The forum alredy exist!'
    })
  }

  const activeResponsive = () =>{
    setNavBarOpen(prev => !prev)
  }

  return (
    <Router>
    <div onClick={handleClick} className='main'>
      <Toaster 
       position="top-right"
       reverseOrder={false}
       />
      <div className='navBarResponsiveBtn'>
        <button onClick={window.window < 600 ? {} : () =>{ activeResponsive() }}>
          {navBarOpen ? <Icon.X/> : <Icon.List/>}
        </button>
        <button className='gap-2 navText' >
          <Icon.CupFill/>
          CoffeePosts
        </button>
      </div>
      <NavBar
      setNavBarOpen={setNavBarOpen}
      navBarOpen={navBarOpen}
      postsList={postsList}
      user={user}
      setDisplayShow={setDisplayShow}
      displayShow={displayShow}
      />
      <hr className='my-5'></hr>
      <Switch>
      <Route path="/Post/:postId&:editingParam">
          <SelectedPost 
            addPost={addPost}
            deletePost={deletePost} 
            updatePost={updatePost}
            setPostsList={setPostsList}
            />
      </Route>
      <Route path="/Post/:postId">
          <SelectedPost 
            user={user} 
            addPost={addPost}
            setPostsList={setPostsList}
            deletePost={deletePost} 
            updatePost={updatePost}
          />
      </Route>
      <Route path="/Forums">
        <Forums forums={forums} createForm={createForm} showModal={showModal} setShowModal={setShowModal} />
      </Route>
      <Route path="/Forum/:forum">
        <SelectedForum/>
      </Route>
      <Route path="/Profile">
        <Profile
        logOutFunction={logOutFunction}
        user={user} 
        />
      </Route>
      <Route path="/LogIn">
      <LogInForm 
        logInFunction={logInFunction}
        user={user}
          />
      </Route>
      <Route path="/Register">
      <RegisterForm 
      registerFunction={registerFunction}
      user={user}
          />
      </Route>
      <Route path="/Home">
      <Home 
          user={user} 
          postsList={postsList}
          addPost={addPost}
          deletePost={deletePost} 
          updatePost={updatePost}
          savePost={savePost}
          />
      </Route>
      <Route path='/:noFound'>
        {() =>{
          return(<h3 style={{textAlign:'center'}}>404 Page Not Found</h3>)
        }}
      </Route>
      <Route path="/">
        <Redirect to='/Home'/>
      </Route>
      </Switch>
    </div>
  </Router>
  );
}
/*
 <div className='main'>
            
      <NavBar
      postsList={postsList} />

    <main className='d-flex flex-row justify-content-center'>
    <section className='mainSection'>
        <div className='d-flex justify-content-center w-100'>
          <PostForm
          addPost={addPost} />
        </div>
        <div className='mt-3 postsContainer'>
          {postsList.map(post =>(
            <Post
            key={post._id}
            title={post.title}
            text={post.text}
            deletePost={deletePost}
            id={post._id}
            />
          ))}
        </div>
      </section>
    </main>
    </div>
*/
export default App;
