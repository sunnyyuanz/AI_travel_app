import React,{useState} from "react";
import axios from 'axios';
import "./Login.css";
import { useNavigate, Link } from 'react-router-dom';

const Login = () =>{
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const onSubmit = async () => {
        if(!username){
            setError("Username is required!")
        }else{
            await axios.post('http://localhost:5001/api/users/login',{
                username: username
            }).then((response) => {
                console.log(response)
                if(response.status === 200){
                    localStorage.setItem('_id', response.data._id)
                    navigate("/journey-start-here");
                }
            }).catch(error => {
                // Handle network errors or other exceptions
                console.error('Error:', error);
                });
        }
    }
    return(
        <div className="wrapper">
        <h2>User Login</h2>
        <div>
            <label htmlFor='username'>Username</label>
            <input type="text" id='username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        </div>
        {/* Error Message */}
        {error && <p>{error}</p>}
        {/* Submit Button */}
        <button onClick={onSubmit}>
        Login
        </button>
        <Link to='/register'>
        <button>Create An Account</button>
        </Link>
    </div>
    )

}

export default Login;