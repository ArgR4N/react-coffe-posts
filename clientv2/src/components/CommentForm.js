import { postCommentService } from '../services/postsServices';
import { useState } from 'react'
const CommentForm = ({ selectedPost, setSelectedPost, sessionUsername, parentId }) =>{
    const [newComment, setNewComment] = useState("")
    return(

        <div className="bg-white p-3 rounded">
<h6>New Comment</h6>
<input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} className="form-control"/>
<button onClick={_ => 
    postCommentService(selectedPost, newComment, selectedPost.comments, setSelectedPost, sessionUsername, parentId ? parentId : null)} 
    className={`btn my-2 ${newComment !== "" ? 'btn-main' : 'btn-secondary'}`}>Comment
</button>
</div>
    )
}

export default CommentForm;