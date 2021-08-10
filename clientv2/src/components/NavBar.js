import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    const putLimit = (array) =>{
        let newArray = []
        array.forEach(item =>{
            if (array.indexOf(item) < 3) {
                newArray.push(item)
            }
        })
        return newArray;
    } 
    return(
        <nav onClick={() => setNavBarOpen(false)} className={`navBar ${navBarOpen ? 'navBarOpen' : ''}`}>
            <Link to='/' className='gap-2 navText'>
                <Icon.CupFill/>
                CoffeePosts
            </Link>   
            <Link to='/' className='gap-2 navText navHomeBtn'>
                <Icon.HouseFill/>
                Home
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
                        <Link to='/Profile'>
                            {user ?
                            <div>
                                <Icon.PersonFill/>
                                {user.username}
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

            <div className=' navItem navSearch navItem'>
                <Icon.Search/>
                <input className='navItem' value={searchText} onChange={handleSearchBarChange} type='text'></input>
                <section className='navItem searchDisplay' style={displayShow ? {} : {display:'none'}}>
                    <h5>Posts</h5>
                    {foundPosts.length > 0
                    ?
                    <div> 
                        {putLimit(foundPosts).map(post=>(
                                <Link to={`/post/${post._id}`} >
                            <button className='navItem navBarFounded ' 
                                    onClick={() => setDisplayShow(false)} 
                                    
                                    style={{color:'grey'}}> 
                                    <span className='navItem' style={{color:'white'}}>
                                    {post.title}
                                    </span>
                                    <br/> Bard-main / {post.user} 
                            </button>
                                </Link>
                        ))} 
                    </div>
                    : 
                    <h6 style={{color:'grey'}} className=' navItem mt-2'>Nothing Found!</h6>}

                </section>
                
            </div>       
        </nav>
    );
}

export default NavBar; 