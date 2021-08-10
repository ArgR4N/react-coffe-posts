import { Link } from 'react-router-dom';

const Forum = ({forum}) =>{
    const {name, description} = forum
    return (
            <Link to={`/Forum/${name}`} >
        <main  className='forum'>
                <h2> {name} </h2>
                <p> {description} </p>
            {/* <button>
                Join
                <Icon.PlusLg/>
                </button>
                <button>
                Delete
                <Icon.X/>
            </button> */}
        </main>
            </Link>
    )
}

export default Forum;