import { useState } from "react"
import toast from "react-hot-toast"

const ForumForm = ({showModal, setShowModal, createForm, handLeModalClick}) =>{
    const [newForum, setNewForum] = useState({name:'', description:''})


    const lengthEnsureFunction = () =>{
        if (newForum.name === '') {
            return 'The forum needs a name!'
        }
        if (newForum.description === '') {
            return 'The forum needs almost a simple description!'
        }
        if (newForum.name.split('').length > 250) {
            return 'The name have a 250 characters max!'
        }
        if (newForum.description.split('').length > 1500) {
            return 'The description have a 1500 characters max!'
        }
        else return ''
    }


    const handleCreateForum = e =>{
        e.preventDefault();
        const msg  = lengthEnsureFunction()
        if(msg === ''){
            createForm(newForum)
        }else{
            toast.error(msg)
        }
    }
    const handleNameChange = e =>{setNewForum(prevState => ({...prevState, name:e.target.value}))}
    const handleDescriptionChange = e =>{setNewForum(prevState => ({...prevState, description:e.target.value}))}
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
            </form>
        </main>
    )
}

export default ForumForm;