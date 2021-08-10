import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

const RegisterForm = ({registerFunction, user}) =>{

    //States
    const [formUser, setFormUser] = useState({username:'', password:''})

    //Handleres
    const handleSubmit = e =>{
        e.preventDefault();
        if(formUser.username !== '' && formUser.password !== ''){
            registerFunction(formUser)
        }
    }

    return(
        <form onSubmit={handleSubmit} className='logInForm'>
            <h3>Register</h3>
            <div className="mb-3">
                <label  className="form-label">Username</label>
                <input
                onChange={e => setFormUser(prevState => ({...prevState, username:e.target.value}))} 
                value={formUser.username} 
                type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label   className="form-label">Password</label>
                <input 
                onChange={e => setFormUser(prevState => ({...prevState, password:e.target.value}))} 
                value={formUser.password} 
                type="password" className="form-control" id="exampleInputPassword1"/>
            </div>

            <button type="submit" style={{marginRight:'25px'}} className="btn btn-primary">Register</button>
            <Link to='/LogIn'>You alredy have an account?</Link>
        </form>
    )
}

export default RegisterForm;
