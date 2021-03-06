import { useState } from 'react'
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
const Post = ({inUser = false, inForum = false ,  isSaved, title, text, deletePost, id,  coffees, updatePost, postForum,  username, sessionUsername, savePost}) =>{
    const [options, setOptions] = useState(false)
    const [coffeesState, setCoffeesState] = useState({state:false, counter:coffees})
    const [saveState, setSaveState] = useState(isSaved)
    //Handlers
    const handleDelete = () =>{
        deletePost(id)
    }
    const handleAddCoffee = () =>{
        setCoffeesState(prevState => ({state:true, counter:prevState.counter + 1}))
            const newPost = {
                title,
                text,
                likes:coffeesState.counter + 1
            }
            updatePost(id, newPost)
    }

    const handleSavePost = () =>{
        savePost(id, setSaveState, saveState)
    }
    return(
            <div  className={`card post ${inForum ?  'w-100 m-2' : ''}`}>
                <Link style={inUser ? {maxWidth:'none'} : {}} to={`/post/${id}`} className="card-body" >
                    <div className="card-subtitle mb-2 text-muted ">
                        <p>
                            Forum:
                            <Link className='postForum' to={`/Forum/${postForum}`}>
                                {postForum}
                            </Link>
                            /Published by:
                            <Link className='postUser   w-auto' to={`/Profile/${username}`}> 
                                <img className='mx-1 ' style={{width:'30px', borderRadius:'100px'}} alt='user-avatar' src={`https://avatars.dicebear.com/api/big-smile/${username}.svg`}></img>
                                {username}
                            </Link>
                        </p>
                    </div>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{text}</p>
                </Link>
                <div style={inUser ? {display:'none'} : {}} className='btnContainer'>
                    <div>
                        <button onClick={() => setOptions(prev => (!prev))}>
                            <Icon.List/>
                        </button>
                        <div style={options ? {opacity:'1', transition:'.3s'} : {opacity:'0',transition:'.3s', visibility:'hidden'}}>
                            <ul className='btnOptionsContainer'>
                                <li>
                                    <button 
                                    onClick={handleSavePost} 
                                    className={saveState ? 'unsave' : 'save'}>
                                        {isSaved
                                        ?<Icon.BookmarkFill/>
                                        :<Icon.Bookmark/>}
                                    </button>
                                </li>                     
                                <li style={username === sessionUsername ? {} : {display:'none'}}>
                                    <button onClick={handleDelete} className='delete'>
                                        <Icon.DashCircleFill/>
                                    </button>
                                </li>                     
                                <li style={username === sessionUsername ? {} : {display:'none'}}>
                                    <Link to={`post/${id}&editing`}>
                                        <button className='edit'>
                                            <Icon.PencilSquare/>
                                        </button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button 
                    onClick={handleAddCoffee}
                    className={'Give-a-coffe mb-1'}>
                        <Icon.CupFill/>
                    <span className='Give-a-coffeCounter'> {coffeesState.counter > 0 ? coffeesState.counter : null} </span>
                    </button>
                </div>
                <div className={`d-${inUser ? 'flex' : 'none'} m-2 gap-1`} >
                    <Icon.CupFill style={{fontSize:'26px'}} />
                    <h4 >{coffeesState.counter} </h4>
                </div>
            </div>
    )
}
 
export default Post;