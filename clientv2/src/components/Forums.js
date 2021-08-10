import * as Icon from 'react-bootstrap-icons'
import { useEffect, useState } from 'react';
//Components
import Forum from './Forum'
import ForumForm from './ForumForm';

const Forums = ({ forums, createForm }) =>{
    const [searchedForum, setSearchedForum] = useState('')
    const [foundForums, setFoundForums] = useState(forums)
    const [showModal, setShowModal] = useState(false)
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

    return(
        <main > 
            <ForumForm createForm={createForm} showModal={showModal} setShowModal={setShowModal} />
            <button onClick={() => setShowModal(prevState => !prevState)} className={showModal ? 'btn btn-danger mt-1 mx-2 position-fixed' :'btn btn-forum mt-1 mx-2 position-fixed'}>
                {showModal ? 'Cancel' : 'Create Forum'}
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
                        <div key={forum.name}>
                           <Forum key={forum.name} forum={forum} />
                        </div>
                    
                    )
                })}

            </ul>

        </main>
    );
}

export default Forums;