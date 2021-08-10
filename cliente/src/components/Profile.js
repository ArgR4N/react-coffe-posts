import { Redirect } from 'react-router';
const Profile = ({user, logOutFunction}) =>{

    const renderProfileSection = () =>{
        return (
            <div style={{width:'50vw', margin:'0 auto'}} className='profileSection'>
                <h2>{user.username}</h2>
                <button onClick={logOutFunction} > Log Out</button>
                <ul>
                    PostList
                </ul>
            </div>
        )
    }

    return(
        <main>
            {user ? renderProfileSection() : <Redirect to='/LogIn' />}
        </main>
        )
}

export default Profile;