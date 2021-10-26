import toast from 'react-hot-toast'
import axios from 'axios';

export const addPostService = (post, setPostsList) =>{
    const addPostPromise = axios.post('/api/posts', post)
      .then(res => {setPostsList(prevState => [res.data, ...prevState])});
    toast.promise(addPostPromise, {
      loading:'Posting...',
      success:'Posted!',
      error:res => console.log(res)
    })
  };

  export const deletePostService = (id, setPostsList, postsList) =>{
    let newPostList = []
    const deletePromise = axios.delete(`/api/posts/${id}`)
      .then(res =>{
        postsList.forEach(post => post._id === id ? null : newPostList.push(post));
        setPostsList(newPostList);
      });
      toast.promise(deletePromise,{
        loading: 'Deleting...',
        success: `Successfully deleted`,
        error: (err) => `This just happened: ${err.toString()}!`,
      })
  }

  export const updatePostService = (id, newPost,setPostsList) =>{
    axios.put(`/api/posts/${id}`, newPost)
      .then(res => {
        if(res.data[0]){
          setPostsList(prevState => prevState.map(post => post._id !== id ? post : res.data))
        } 
        toast.success('Successfully updated!')
      })
    }
    
  export const getPostsService = setPostsList =>{
    axios.get('/api/posts')
    .then(res =>{
      setPostsList(res.data.posts)
    })
  }

  
  export const postCommentService = (selectedPost, newComment, oldsComments, setter) =>{
    if(newComment === "") return toast.error("comment something!")
    axios.put(`/api/comment/${selectedPost.id}&''`, {msg:newComment, oldsComments})
    .then(res => {
      if(res.data[0]) setter(prev => ({...prev, comments:res.data[1]}))
    })
  }
