import toast from 'react-hot-toast';
import axios from 'axios';

export const logInService = (user, setUser) =>{
    const logInPromise = axios.post('api/login', user)
    .then(res => {
      const [state, user] = res.data
      const {username, _id, createdAt, savedPosts, forums} = user
      const userWrongFunction = () =>{
        setUser(null);
        toast.error('Username or Password wrong!')
      }
      state 
        ? setUser({username, id:_id, createdAt, savedPosts, forums})
        : userWrongFunction()
    })
  //Toast
  toast.promise(logInPromise, {
    loading:'Login in...',
    error: 'User or Password are wrong!',
    success: 'Logged!'
  })
}

export const registerService = (user, setUser) =>{
    if (user.username !== '' && user.password !== '') {
      const registerPromise = axios.post('api/register', user)
      .then(res => {
        setUser(res.data[1])
      })
      //Toast
      toast.promise(registerPromise, {
        loading:'Registering...',
        success:`User Created!`,
        error:res => res.toString()
      })
    }
  }

export const logOutService = (setUser) =>{
    axios.get('/api/logout')
      .then(() => {
        setUser(null)
        toast('Logged Out!', {icon:'👌'});
      })
  }
export const savePostService = (postId, setSaveState, saveState, user, setUser) =>{
    if (user) {
      const savePromise = axios.put(`/api/users/${user ? user.id : 'none'}`, {postId, savedPosts:user.savedPosts})
        .then(res => {
          setSaveState(prevState => !prevState)
          setUser(prev => ({...prev, savedPosts:res.data.readyUser.savedPosts}))
        })
          toast.promise(savePromise, {
            loading:'Saving...',
            success:`Succesfyllu ${saveState ? 'UnSaved' : 'Saved'}`,
            error:res => `Error while saving: ${res.data}`
          })
        }else{
        toast.error('You are not logged in...')
      }
}

export const getUserService = (setUser, setUsers) =>{
  axios.get('/api/users')
  .then(res =>{
    setUsers(res.data)
  })
  axios.get('/api/user')
  .then(res =>{
    if (!res.data.msg) {
      setUser(res.data)
      console.log(res.data)
      toast.success(`Welcome back ${res.data.username}!`, {icon:'👋',duration:1500})
    }else{
      return null;
    }
  })
}