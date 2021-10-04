import toast from 'react-hot-toast';
import axios from 'axios';

export const createFormService = (newForm, setForums, setShowModal) =>{
    const createFormPromise = axios.post('/api/forums', newForm)
    .then(res => {
      if(res.data) {
        setForums(prev => [...prev, res.data[1]])
        setShowModal(false)  
      }
    })
    toast.promise(createFormPromise, {
      loading:'Creating form...',
      success:'Forum created!',
      error:'The forum alredy exist!'
    })
  }

export const geForumsService = setForums =>{
  axios.get('/api/forums')
  .then(res => {
    setForums(res.data.forums)
  })
}

export const joinFunction = (forum, setter, user, setUser) =>{
  axios.put(`/api/users/${user.id}`, {forums:[...user.forums, forum]})
  .then(res => {
      if(res.data.state){
          setter(true)
          setUser(res.data.newUser)
      }
  })
}

export const unJoinFunction = (forum, setter, user) =>{
  let forums = user.forums
  console.log(forums)
  forums.splice(user.forums.indexOf(forum), 1);
  console.log(forums)
  axios.put(`/api/users/${user.id}`, {forums})
  .then(res => setter(false))
}