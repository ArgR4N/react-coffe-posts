const Comment = ({comment}) =>{
    const { msg } = comment
    return( <li className="bg-white my-2 p-2"> {msg} </li> )
}

export default Comment