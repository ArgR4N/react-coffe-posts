import { Link, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Icon from 'react-bootstrap-icons';

const SelectedPost = ({updatePost, deletePost, setPostsList, sessionUsername, savePost}) =>{
    const { postId, editingParam } = useParams() 
    
    const [selectedPost, setSelectedPost] = useState({})
    const [newPost, setNewPost] = useState({title:'',text:''})
    const [coffees, setCoffees] = useState({original:0, actual:0})
    const [errorState, setErrorState] = useState(' ')
    const [editing, setEditing] = useState(editingParam)   
    
    useEffect(() =>{
        const loadingToast = toast.loading('Loading...')
        axios.get(`/api/posts/${postId}`)
            .then(res => {
                const newSelectedPost ={
                    title:res.data.title,
                    text:res.data.text,
                    id:res.data._id,
                    username:res.data.user
                }
                setCoffees({original:res.data.likes, actual:res.data.likes})
                setSelectedPost(newSelectedPost)
                setNewPost({title:res.data.title, text:res.data.text})
                toast.dismiss(loadingToast)
            })
        
    }, [postId])
    const handleAddCoffee = () =>{
        if (coffees.actual !== coffees.original ) {
            const newPost = {
                title:selectedPost.title,
                text:selectedPost.text,
                likes:coffees.actual
            }
            updatePost(selectedPost.id, newPost)
            setCoffees(prevState => ({...prevState, original:coffees.actual}))
        }
    }
    const handleDelete = () =>{
        deletePost(selectedPost.id)
    }
    const handleUpdateNote = () =>{
        if (lengthEnsureFunction()[0]) {
            setEditing(false);
            const updatedPost = {
                title:newPost.title,
                text:newPost.text,
                likes:coffees.actual
            }
            axios.put(`/api/posts/${selectedPost.id}`, updatedPost)
                .then(res =>{
                    const newSelectedPost ={
                        title:res.data.title,
                        text:res.data.text,
                        id:res.data._id,
                        user:res.data.user
                    }
                    setCoffees({original:res.data.likes, actual:res.data.likes})
                    setSelectedPost(newSelectedPost)
                    toast.success('Edited!')
                })
            axios.get('/api/posts')
                .then(res =>{
                setPostsList(res.data.posts)
      })
        }else{
            setErrorState(lengthEnsureFunction()[1])
        }
    }
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
        if (newPost.title === selectedPost.title && newPost.text === selectedPost.text) {
            return [false, 'You can´t update a post with no changes!']
        }
        else return [true, '']
    }
        return(
        <main className='d-flex flex-row justify-content-center'>
            {selectedPost.title ? editing ?
            <div  className="card selectedPost">
            <form className="gap-2 w-100 d-flex p-5 justify-content-center align-items-center" style={{flexDirection:'column'}}>
                <input onChange={e => (setNewPost(prevState => ({...prevState, title:e.target.value})))} value={newPost.title}  placeholder={selectedPost.title} className="w-75 input form-control"></input>
                <textarea  onChange={e => (setNewPost(prevState => ({...prevState, text:e.target.value})))} value={newPost.text} rows="6" placeholder={selectedPost.text} className="w-75 form-control"></textarea>
                <small> {errorState} </small>
            </form>
            <div className='btnContainer'>
                    <div >
                        <ul style={{height:'300px', transform:'scale(2.2)'}} className='btnOptionsContainer d-flex flex-colums justify-content-center align-items-center gap-3'>
                            <li >
                                <Link onClick={handleUpdateNote} to={`/post/${selectedPost.id}`}>
                                    <button>
                                        <Icon.Check/>
                                    </button>
                                </Link>
                            </li >                     
                            <li >
                            <Link onClick={() => setEditing(false)} to={`/post/${selectedPost.id}`}>
                                   <button>
                                    <Icon.X/>
                                   </button>
                            </Link>
                            </li>                     
                        </ul>
                    </div>
            </div>
        </div>
            :
            <div  className="card selectedPost">
                <div className="card-body" >
                    <h5 className="card-title">{selectedPost.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">forum - {selectedPost.username} </h6>
                    <p className="card-text">{selectedPost.text}</p>
                </div>
                <div className='btnContainer'>
                        <div >
                            <ul className='btnOptionsContainer'>
                                <li>
                                    <button className='save'>
                                        <Icon.Bookmark/>
                                    </button>
                                </li>                     
                                <li>
                                    <Link style={selectedPost.username === sessionUsername ? {} : {display:'none'}} to='/'>
                                        <button onClick={handleDelete}  className='delete'>
                                            <Icon.DashCircleFill/>
                                        </button>
                                    </Link>
                                </li>                     
                                <li>
                                    <div style={selectedPost.username === sessionUsername ? {} : {display:'none'}} onClick={() => setEditing(true)} >
                                        <button className='edit'>
                                            <Icon.PencilSquare/>
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <button
                                        onMouseLeave={handleAddCoffee}
                                        onClick={() => setCoffees(prevState => ({...prevState, actual:prevState.actual + 1}))}
                                        className='Give-a-coffe mb-1'>
                                            <Icon.CupFill/>
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <small className='coffeeCounter'>
                                        {coffees.actual} <Icon.CupFill/>
                                        </small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                </div>
            </div>
            : 'Searching ...'}        
        </main>
    )
}

export default SelectedPost;