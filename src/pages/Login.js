import React, { useState } from 'react';

import { sendMagicLink } from '../services/API';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className='Login'>
            <h2>Log in or register</h2>
            {submitted ? (
                <>
                    <p>Check your email and click the link you were sent to finish logging in.</p>
                </>
            ) : (
                <>
                    <p>Enter the email you use for Spotify.</p>
                    <input type='email' placeholder='Email' id='emailInput' onInput={setEmail} />
                    <a className='button' onClick={() => {
                        sendMagicLink(email).then(() => setSubmitted(true));
                    }}>Next</a>
                </>
            )}
        </div>
    );
};

export default Login;
