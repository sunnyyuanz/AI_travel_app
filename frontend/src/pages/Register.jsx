import {useState} from 'react';
import axios from 'axios';
import "./Register.css";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const username_validated = (username) => {
        if(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username)){
            setError("Username can not contain symbols!")
            return false
        }else if(username.length<1){
            setError("Username is required!")
            return false
        }
        return true
    }

    const onSubmit = async () => {
        if(username_validated(username)){
            setError("")
            await axios.post('http://3.144.28.53:4000/api/users',{
                username: username
            }).then((response) => {
                console.log(response)
                if(response.status === 201){
                    navigate("/login");
                }else if(response.status === 401){
                    alert("Username already exists!")
                }
            }).catch(error => {
                // Handle network errors or other exceptions
                console.error('Error:', error);
                });
            ;
        }else{
            alert("Please fix the errors!")
        }
    }

    return(
        <div className='wrapper'>
            <h2>User Registration</h2>
            <div>
                <label htmlFor='username'>Create a username</label>
                <input type="text" id='username' name='username' value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            </div>
            {/* Error Message */}
            {error && <p>{error}</p>}
            {/* Submit Button */}
            <button onClick={onSubmit}>
            Register
            </button>
            <Link to='/login'>
            <button>Already Registered</button>
            </Link>
        </div>
    )
    
}

export default Register;