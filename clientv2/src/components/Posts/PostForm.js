import { useEffect, useState } from "react";
import * as Icon from 'react-bootstrap-icons';
import toast from 'react-hot-toast'
const PostForm = ({addPost, username, user, forums ,alredyOpen = false, clickedForum, setShowForm}) =>{
    //States
    useEffect( () =>{
        setNewPost(prev => ({...prev, forum:clickedForum}))
        setFoundedForums(forums)
    }, [clickedForum,forums])
    const [newPost, setNewPost] = useState({title:'', text:'', forum:clickedForum || ''})
    const [isOpen, setIsOpen] = useState(alredyOpen)
    const [showForumDisplay, setShowForumDisplay] = useState(false)
    const [foundedForums, setFoundedForums] = useState(forums)
    const lengthEnsureFunction = () =>{
        if (newPost.form === '') {
            return [false, 'You need a forum where post!']
        }
        if (newPost.title === '') {
            return [false, 'The title needs information!']
        }
        if (newPost.text === '') {
            return [false, 'The text needs information!']
        }
        if (newPost.title.split('').length > 250) {
            return [false, 'The title have a 250 characters max!']
        }
        if (newPost.text.split('').length > 950) {
            return [false, 'The text have a 950 characters max!']
        }
        if (newPost.forum === '') return [false, 'The post needs a forum!']
        else return [true, '']
    }
    //Handelers
    const handleSubmit = e =>{
        e.preventDefault()
        console.log(newPost)
        if(username){
            const msg = lengthEnsureFunction()[1]
            if (lengthEnsureFunction()[0]) {
                addPost({...newPost, username})
                setNewPost({title:'', text:''})
                setIsOpen(alredyOpen)
                return setShowForm ? setShowForm(false) : null
            }else{
                toast.error(msg)
            }
        }
        if(!username){
            toast.error('You need to be logged in!')
        }
    }

    const handleTitleChange = e =>{
        setNewPost(prevState => ({...prevState, title:e.target.value}))
    }

    const handleTextChange = e =>{
        setNewPost(prevState => ({...prevState, text:e.target.value}))
    }
    const handleOpenFormClick = ()=>{
        if (!alredyOpen) {
            user ? setIsOpen(prevState => !prevState) : toast.error('You need to be logged in!')
        }
    }

    const handleForumChange = e =>{
        let foundsList = [];
        forums.forEach(forum => {
        if(forum.name.toLowerCase().includes(e.target.value.toLowerCase())){
            foundsList.push(forum)
        }else{
            return null;
        }
        });
        setFoundedForums(foundsList)
        if (foundsList.length === 0) {
            setTimeout(() => setShowForumDisplay(false), 3000)
        }
    }
    const handleForumClick = forum =>{
        setShowForumDisplay(false)
        setNewPost(prev => ({...prev, forum}))
    }

    const handleModalClick = e =>{
        if (e.target.classList[0] === 'postFormModal') {
            setShowForumDisplay(false)
        }
    }

    const handleForumSelectionClick = e =>{
        if (e.target.classList[0] === 'form-control') {
            setShowForumDisplay(true)
        }
    }
    console.log(user);
return(
    <form style={isOpen ? {border:'none'} : {height:'45px', border:'none', gap:'10px'}} onSubmit={handleSubmit} className='p-2 w-100 overflow-hidden mb-2 mt-4 card' >
        <div onClick={handleOpenFormClick}  style={{fontSize:'23px', marginBottom:'10px', cursor:'pointer'}} className='d-flex  align-items-center justify-content-between openFormState'>
            <h4 style={{margin:'0', userSelect:'none'}}>Create Post</h4>
            <button 
            className={`${alredyOpen ? 'd-none' : ''} d-flex align-items-center justify-content-center`}
            style={{height:'23px', width:'23px'}} 
            type='button'>
                {isOpen 
                ? <Icon.ArrowBarUp/>
                : <Icon.ArrowBarDown/>
                }
            </button>
        </div>
        <section  onClick={handleForumSelectionClick} className="mb-3 w-25">
            <input  style={{cursor:'pointer'}} value={newPost.forum} disabled placeholder='Forum' type="text" className="form-control" />
            <section onClick={handleModalClick} className={`postFormModal ${showForumDisplay ? '' : 'd-none'}`}>
                <div className='postForumModalSection'>
                <input  onChange={handleForumChange}  placeholder='Search' type="text" className="form-control" />
                <ul>
                {foundedForums.map(forum => (
                    <li onClick={() => handleForumClick(forum.name)}> {forum.name} </li>
                    ))}
                </ul>
                <button type='button' onClick={_ => setShowForumDisplay(false)} className='btn btn-danger'>Cancel</button>
                </div>
            </section>
        </section>
        <div className="mb-3 w-75">
            <input onChange={handleTitleChange} value={newPost.title} placeholder='Title' type="text" className="form-control" aria-describedby="emailHelp"/>
        </div>

        <div className="mb-3">
            <textarea onChange={handleTextChange} value={newPost.text}  placeholder='Text' className="form-control" rows="6"/>
        </div>

        <div>
        <button type="submit" className="w-25 btn btn-main">Post</button>
        </div>
    </form>
);

};

export default PostForm;