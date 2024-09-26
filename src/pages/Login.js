import React, { useEffect, useState } from 'react';

import { sendMagicLink, verifyMagicLink } from '../services/API';

const Login = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const magicLinkId = urlParams.get('link');
        if (magicLinkId) {
            verifyMagicLink(magicLinkId).then((response) => {
                localStorage.setItem('token', response.token);
                window.location.reload();
            });
        }
    }, []);

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
                    <input type='email' placeholder='Email' id='emailInput' onChange={(e) => setEmail(e.target.value)} />
                    <a className='button' onClick={() => {
                        sendMagicLink(email).then(() => setSubmitted(true));
                    }}>Next</a>
                </>
            )}
        </div>
    );
};

export default Login;
