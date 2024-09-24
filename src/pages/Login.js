import React from 'react';

const Login = () => {


    return (
        <div className='Login'>
            <h2>Log in or register</h2>
            <p>Enter the email you use for Spotify.</p>
            <input type='email' name='email' placeholder='Email' />
            <a className='button' onClick={}>Next</a>
        </div>
    );
};

export default Login;
