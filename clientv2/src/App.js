import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import * as Icon from 'react-bootstrap-icons';
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
  useEffect( () =>{
    axios.get('/api/posts')
      .then(res =>{
        setPostsList(res.data.posts)
      })
    axios.get('/api/forums')
      .then(res => {
        setForums(res.data.forums)
      })
    axios.get('/api/user')
      .then(res =>{
        if (res.data.username) {
          setUser(res.data)
        }else{
          return null;
        }
      })
  }, [])

  const addPost = (post) =>{
    axios.post('/api/posts', post)
      .then(res => {setPostsList(prevState => [res.data, ...prevState])});
  };

  const deletePost = (id) =>{
    let newPostList = []
    axios.delete(`/api/posts/${id}`)
      .then(res =>{
        postsList.forEach(post => post._id === id ? null : newPostList.push(post));
        setPostsList(newPostList);
      });
  }

  const updatePost = (id, newPost) =>{
    axios.put(`/api/posts/${id}`, newPost)
      .then(res => setPostsList(prevState => prevState.map(post => post._id !== id ? post : res.data)))
  }


  //User functions
  const logInFunction = (user) =>{
      axios.post('api/login', user)
        .then(res => {
          const [state, user] = res.data
          const {username, _id, createdAt, savedPosts} = user
          
          const userWrongFunction = () =>{
            alert('User Wrong!');
            setUser(null);
          }
          state 
            ? setUser({username, id:_id, createdAt, savedPosts})
            : userWrongFunction()
        })
  }  
  const registerFunction = (user) =>{
    if (user.username !== '' && user.password !== '') {
      axios.post('api/register', user)
        .then(res => {
          alert(res.data[1]);
        })
      
    }
  }
  const logOutFunction = () =>{
    axios.get('/api/logout')
      .then(res => setUser(null))
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
    axios.post('/api/forums', newForm)
      .then(res => {
        if(res.data[0]) setForums(prev => [...prev, res.data[1]])
        else alert('The forum alredy exist!')
      })
  }

  const activeResponsive = () =>{
    setNavBarOpen(prev => !prev)
  }
  return (
    <Router>
    <div onClick={handleClick} className='main'>
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
        <Forums forums={forums} createForm={createForm} />
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
