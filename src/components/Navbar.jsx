import React from 'react';

const Navbar = ({ isLoggedIn, logout }) => {
    return (
        <nav>
            {/* TODO: re-enable once Spotify login is approved*/}
            {/*isLoggedIn && (
                <button onClick={logout}>Logout</button>
            )*/}
        </nav>
    );
};

export default Navbar;
