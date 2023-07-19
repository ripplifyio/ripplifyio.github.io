import React from 'react';
import * as Globals from '../Globals';

const Splash = () => {
    return (
        <div className='splash'>
            <h2>Create stunning visualizations of your Spotify listening history.</h2>
            <a className='loginButton' href={`${Globals.AUTH_ENDPOINT}?client_id=${Globals.CLIENT_ID}&redirect_uri=${Globals.REDIRECT_URI}&response_type=${Globals.RESPONSE_TYPE}&scope=${Globals.SCOPE}`}>Login with Spotify</a>
        </div>
    );
};

export default Splash;
