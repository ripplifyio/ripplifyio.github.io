import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ isLoggedIn, logout }) => {
    return (
        <nav>
            <a href='/about'>About</a>
            <a href='/prints'>Prints</a>
            {isLoggedIn && (
                <button onClick={logout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
