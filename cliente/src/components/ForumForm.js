import { useEffect, useState } from "react"

const ForumForm = ({showModal, setShowModal, createForm}) =>{
    const [randomMsg, setRandomMsg] = useState('Create a new forum!')
    const [newForum, setNewForum] = useState({name:'', description:''})

    const handleCreateForum = e =>{
        e.preventDefault();
        createForm(newForum)
    }
    const handleNameChange = e =>{setNewForum(prevState => ({...prevState, name:e.target.value}))}
    const handleDescriptionChange = e =>{setNewForum(prevState => ({...prevState, description:e.target.value}))}
    useEffect(() =>{
        const msgOption = ['the new most visited forum!', 'a place to talk and debate!',
        'a option for find new friends!', 'the best coffeposts forum!', 'a brand new forum!']
        setRandomMsg(msgOption[Math.floor(Math.random() * msgOption.length)])
    }, [])


    const handLeModalClick = e =>{
        if (e.target.classList[0] === 'forumFormModal') {
            setShowModal(false)
        }
    }
    return(
        <main onClick={handLeModalClick} style={showModal ? {} : {display:'none'}} className='forumFormModal'>
            <form  onSubmit={handleCreateForum} style={{margin:'0 auto'}} className='forumForm'>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input placeholder='Name' value={newForum.name} onChange={handleNameChange} type="text" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea placeholder='Description' value={newForum.description} onChange={handleDescriptionChange} className="form-control" rows='4'/>
                </div>
                <button type="submit" className="btn btn-main">Create</button>
                <small style={{margin:'20px', userSelect:'none'}}>Create {randomMsg}</small>
            </form>
        </main>
    )
}

export default ForumForm;