import { useState } from "react";
import * as Icon from 'react-bootstrap-icons';
import toast from 'react-hot-toast'
const PostForm = ({addPost, username}) =>{
    //States
    const [newPost, setNewPost] = useState({title:'', text:'', forum:''})
    const [isOpen, setIsOpen] = useState(false)

    const lengthEnsureFunction = () =>{
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
        else return [true, '']
    }
    //Handelers
    const handleSubmit = e =>{
        e.preventDefault()
        if(username){
            const msg = lengthEnsureFunction()[1]
            if (lengthEnsureFunction()[0]) {
                addPost({title:newPost.title, text:newPost.text, username})
                setNewPost({title:'', text:''})
                setIsOpen(false)
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
        setIsOpen(prevState => !prevState)
    }
return(
    <form style={isOpen ? {} : {height:'45px'}} onSubmit={handleSubmit} className='p-2 overflow-hidden w-75 mb-2 mt-4 card' >
        <div onClick={handleOpenFormClick}  style={{fontSize:'23px', marginBottom:'10px', cursor:'pointer'}} className='d-flex  align-items-center justify-content-between openFormState'>
            <h4 style={{margin:'0', userSelect:'none'}}>Create Post</h4>
            <button 
            className={isOpen
            ?'closeForm d-flex align-items-center justify-content-center' 
            :'openForm d-flex align-items-center justify-content-center'
            }
            style={{height:'23px', width:'23px'}} 
            type='button'>
                {isOpen 
                ? <Icon.ArrowBarUp/>
                : <Icon.ArrowBarDown/>
                }
            </button>
        </div>
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