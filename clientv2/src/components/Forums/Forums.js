import * as Icon from 'react-bootstrap-icons'
import { useEffect, useState } from 'react';
//Components =>
import Forum from './Forum'
import ForumForm from './ForumForm';
import toast from 'react-hot-toast'
import PostForm from '../Posts/PostForm'
import axios from 'axios';
//Components <=

const Forums = ({ forums, createForm, showModal, setShowModal, user, addPost, setUser }) =>{
    const [searchedForum, setSearchedForum] = useState('')
    const [foundForums, setFoundForums] = useState(forums)
    const [showForm, setShowForm] = useState(false)
    const [clickedForum, setClickedForum] = useState('')
    useEffect(()=>{
        setFoundForums(forums)
    }, [forums])

    const handleSearchChange = e =>{
        setSearchedForum(e.target.value)
        if (e.target.value !== '') {
            let foundsList = [];
            forums.forEach(forum => {
                if(forum.name.toLowerCase().includes(e.target.value.toLowerCase())){
                    foundsList.push(forum)
                }
            });
            setFoundForums(foundsList)
        }
        else{
            setFoundForums(forums)
        }
    }
    const joinFunction = (forum, setter) =>{
        axios.put(`/api/users/${user.id}`, {forums:[...user.forums, forum]})
        .then(res => {
            if(res.data.state){
                setter(true)
                setUser(res.data.newUser)
            }
        })
    }

    const unJoinFunction = (forum, setter) =>{
        let forums = user.forums
        console.log(forums)
        forums.splice(user.forums.indexOf(forum), 1);
        console.log(forums)
        axios.put(`/api/users/${user.id}`, {forums})
        .then(res => setter(false))
    }

    const handleCreateFormClick = () =>{
        user 
        ? setShowModal(prev => !prev)
        : toast.error('You need to be logged in')
    }
    const handLeModalClick = e =>{
        if (e.target.classList[0] === 'forumFormModal') {
            setShowModal(false)
            setShowForm(false)
        }
    }
    return(
        <main >
            <section onClick={handLeModalClick} className={`forumFormModal ${showForm ? null :'d-none'} `}>
                <PostForm 
                    username={user ? user.username : false} 
                    user={user}
                    forums={forums}
                    alredyOpen={true}
                    clickedForum={clickedForum}
                    addPost={addPost}
                    setShowForm={setShowForm}
                />
            </section>
                <ForumForm  
                    handLeModalClick={handLeModalClick} 
                    user={user} 
                    createForm={createForm} 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                />
            <button onClick={handleCreateFormClick} className={`btn ${showForm ? 'd-none' : ''} ${showModal ? 'btn-danger' : 'btn-forum'} mt-1 mx-2 position-fixed`}>
                {showModal ? 'Cancel' : 'Create Forum'}
            </button>
            <button onClick={_ => setShowForm(false)} className={`btn ${showForm ?  '' : 'd-none'} btn-danger mt-1 mx-2 position-fixed`}>
                Cancel
            </button>
            <h2 style={{textAlign:'center'}}> Search for Forums </h2>
                <div className='forumSearchBar  d-flex align-items-center justify-content-center gap-2'>
                    <Icon.Search/>
                    <input onChange={handleSearchChange} value={searchedForum} placeholder='Just type...' type='text'></input>
                </div>
            <h4 className='mt-3 mb-2' style={{textAlign:'center'}}> {`${foundForums.length} ${foundForums.length !== 1 ? 'Forums' : 'Forum'}`} </h4>
            {/* <ForumForm /> */}
            <ul className='forumsContainer'>
                {foundForums.map(forum =>{
                    return (
                        <div onClick={_=> setClickedForum(forum.name)} key={forum.name}>
                           <Forum 
                           setClickedForum={setClickedForum} 
                           user={user} 
                           key={forum.name} 
                           forum={forum} 
                           setShowForm={setShowForm} 
                           unJoinFunction={unJoinFunction}
                           joinFunction={joinFunction}
                           />
                        </div>
                    )
                })}
            </ul>

        </main>
    );
}

export default Forums;