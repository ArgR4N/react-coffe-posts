import './App.css';
import { useState, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
//Components =>
//Toaster
import { Toaster } from 'react-hot-toast';
import Home from './Home'
import NavBar from './components/NavBar';
import SelectedPost from './SelectedPost'
import Forums from './components/Forums/Forums'
import LogInForm from './components/Users/LogInForm'
import RegisterForm from './components/Users/RegisterForm'
import SelectedForum from './components/Forums/SelectedForum';
import SelectedProfile from './components/Users/SelectedProfile'
import SearchingSection from './components/SearchingSection';
import Profile from './components/Users/Profile';
//Components <=

//Services =>
import { addPostService, updatePostService, deletePostService, getPostsService } from './services/postsServices'
import { logInService, registerService, logOutService, savePostService, getUserService } from './services/userServices'
import { createFormService, geForumsService } from './services/forumsServices';
//Services <=


//Routes =>
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//ROutes <=
const App = () => {
  const [forums, setForums] = useState([])
  const [postsList, setPostsList] = useState([])
  const [users, setUsers] = useState([])

  //User Session
  const [user, setUser] = useState(null)
  const [navBarOpen, setNavBarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect( () =>{
    //Fetch de los posts
    getPostsService(setPostsList)
    //Fetch de los forums
    geForumsService(setForums)
    //Fetch del usuario y de los usuarios
    getUserService(setUser, setUsers)
  }, [])

  //Post functions =>
  const addPost = (post) => addPostService(post, setPostsList)
  const deletePost = (id) => deletePostService(id, setPostsList, postsList)
  const updatePost = (id, newPost) => updatePostService(id, newPost, setPostsList)
  //Post functions <=
  
  //User functions =>
  const logInFunction = (user) => logInService(user, setUser)  
  const registerFunction = (user) => registerService(user, setUser)
  const logOutFunction = _ => logOutService(setUser)
  const savePost = (postId, setSaveState, saveState) => savePostService(postId, setSaveState, saveState, user, setUser)
  //User functions <=
  
  //Forums functions =>
  const createForm = newForm => createFormService(newForm, setForums, setShowModal)
  //Forums functions <=
  
  //NavBarSearchSection =>
  const [displayShow, setDisplayShow] = useState(false)
  const handleClick = e =>{
    if (e.target.classList[0] !== 'navItem') {
      setDisplayShow(false)
    }
  }
  //NavBarSearchSection <=

  const activeResponsive = () =>{
    setNavBarOpen(prev => !prev)
  }

  return (
    <Router>
    <div onClick={handleClick} className='main'>
      <Toaster 
       position={window.screen.width > 600 ? "bottom-right" : "top-center"}
       reverseOrder={false}
       toastOptions={{
          className:'toast'
      }}
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

        <Route path="/Searching&search=:search">
          <SearchingSection 
          users={users}
          postsList={postsList}
                      />
        </Route>

        <Route path="/Post/:postId&:editingParam">
            <SelectedPost 
              sessionUsername={user ? user.username : ''} 
              addPost={addPost}
              savePost={savePost}
              deletePost={deletePost} 
              updatePost={updatePost}
              user={user}
              setPostsList={setPostsList}
              />
        </Route>

        <Route path="/Post/:postId">
            <SelectedPost 
              sessionUsername={user ? user.username : ''} 
              addPost={addPost}
              savePost={savePost}
              setPostsList={setPostsList}
              deletePost={deletePost} 
              updatePost={updatePost}
              />
        </Route>

        <Route path="/Forums">
          <Forums 
          setUser={setUser} 
          addPost={addPost} 
          user={user} 
          forums={forums} 
          createForm={createForm} 
          showModal={showModal} 
          setShowModal={setShowModal} 
          />
        </Route>

        <Route path="/Forum/:forum">
          <SelectedForum user={user}  setUser={setUser} forums={forums} />
        </Route>

        <Route path="/Profile/:user">
          <SelectedProfile />
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
            forums={forums.length > 0 ? forums : []}
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
export default App;
