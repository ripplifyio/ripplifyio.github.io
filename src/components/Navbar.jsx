import React from 'react';

const Navbar = ({ isLoggedIn, logout }) => {
    return (
        <nav>
            {isLoggedIn && (
                <a href='#' onClick={logout}>Logout</a>
            )}
        </nav>
    );
};

export default Navbar;
