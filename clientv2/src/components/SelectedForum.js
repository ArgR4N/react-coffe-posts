import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";


const SelectedForum = (props) =>{
    const { forum } = useParams();
    const [selectedForum, setSelectedForum] = useState({name:'', description:'', users:[]})
    useEffect(() =>{
        axios.get(`/api/forums/${forum}`)
            .then(res =>{
                res.data.name
                ? setSelectedForum(res.data)
                : <Redirect to='/Home' />
            })
    }, [forum])
    console.log(selectedForum)
    const {name, description, users} = selectedForum
    return(
        <main className='selectedForum'>
            <h2> {name} </h2>
            <p> {description} </p>
            <ul>
                {users.map(user => <h3> user </h3>)}
            </ul>
            <h3>Posts</h3>
        </main>
    )
}

export default SelectedForum;