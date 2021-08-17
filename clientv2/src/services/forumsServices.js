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