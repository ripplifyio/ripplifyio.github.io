import React from 'react';

const Navbar = ({ isLoggedIn, logout }) => {
    return (
        <nav>
            {isLoggedIn && (
                <button onClick={logout}>Logout</button>
            )}
        </nav>
    );
};

export default Navbar;
