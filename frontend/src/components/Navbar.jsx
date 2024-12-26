import React from "react";
import { useNavigate,Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const isAuth= localStorage.getItem('_id') ? true : false;
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    return(
        <nav>
            {isAuth ? <button onClick={handleSignOut}>Sign Out</button> : <Link to='/login'><button>Sign In</button></Link>}
        </nav>
    )
}

export default Navbar