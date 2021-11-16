import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
const NavBar = ({postsList, user, setDisplayShow, displayShow, navBarOpen,setNavBarOpen}) =>{
    //States
    const [searchText, setSearchText] = useState('')
    const [foundPosts, setFoundPosts] = useState([])
    //Handelers
    const handleSearchBarChange = e =>{
        setSearchText(e.target.value)
        if (e.target.value !== '') {
            setDisplayShow(true)
            let foundsList = [];
            postsList.forEach(post => {
            if(post.title.toLowerCase().includes(e.target.value.toLowerCase())){
                foundsList.push(post)
            }else{
                return null;
            }
            });
            setFoundPosts(foundsList)
        }
        else{
            setDisplayShow(false)
            setFoundPosts([])
        }
    }
    const setLimit = list =>{
        return list.slice(0, 3)
    }
    return(
        <nav onClick={e => setNavBarOpen(e.target.id === 'searchBar')} className={`navBar ${navBarOpen ? 'navBarOpen' : ''}`}>
            <Link to='/'className='gap-2 navText'>
                <Icon.CupFill/>
                CoffeePosts
            </Link>   
            <div className='navSocailFunctions'>
                <ul>
                    <li>
                        <Link to='/Forums'>
                            <div>
                                <Icon.XDiamond/>
                                Forums
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='gap-2 navText navHomeBtn'>
                                <Icon.HouseFill/>
                        </Link>   
                    </li>
                    <li>
                        <Link to='/Profile'>
                            {user ?
                            <div className='d-flex align-items-center gap-1'>
                                <img style={{width:'30px', borderRadius:'100px'}} alt='user-avatar' src={`https://avatars.dicebear.com/api/big-smile/${user.username}.svg?background=white`}></img>
                                <h5 style={{margin:'0'}}>{user.username}</h5>
                            </div>
                            :
                            <div>
                                <Icon.PersonFill/>
                                LogIn
                            </div>}
                        </Link>
                    </li>
                </ul>
            </div>

            <div  style={{cursor:'default'}} className=' navItem navSearch navItem'>
                <input  id="searchBar" placeholder='Search...' className='navItem' value={searchText} onChange={handleSearchBarChange} type='text'></input>
                <section  className='navItem searchDisplay' style={displayShow ? {} : {display:'none'}}>
                    <h5>Posts</h5>
                    {foundPosts.length > 0
                    ?
                    <div> 
                        {setLimit(foundPosts).map(post=>(
                                <Link to={`/post/${post._id}`} >
                                    <button className='navItem navBarFounded ' 
                                            onClick={() => setDisplayShow(false)} 
                                            style={{color:'grey'}}> 
                                            <span className='navItem' style={{color:'white'}}>
                                            {post.title}
                                            </span>
                                            <br/> {post.forum} - {post.user} 
                                    </button>
                                </Link>
                        ))} 
                    </div>
                    : 
                    <h6 style={{color:'grey'}} className=' navItem mt-2'>Nothing Found!</h6>}
                    

                    <Link to={`/Searching&search=${searchText}`} className='searchDisplayOthers'>See  {foundPosts.length > 3 ? 'more posts and' : ''} users here! </Link>
                </section>
                    <Link  className='d-flex align-items-center' to={`/Searching&search=${searchText}`}>
                        <Icon.Search />
                    </Link>
                
            </div>       
        </nav>
    );
}

export default NavBar; 