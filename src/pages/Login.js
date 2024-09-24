import React from 'react';

const Login = ({ action }) => {
    return (
        <div className='Login'>
            <h2>Log in or registers</h2>
            <p>Enter the email you use for Spotify.</p>
            <input type='email' name='email' placeholder='Emaili' />
            <a className='button big' onClick={action}>Get a sign-in link</a>
        </div>
    );
};

export default Login;
