import React from 'react';

import exampleGraphImage from '../images/example.png';

const About = ({ action }) => {
    return (
        <div className='About'>
            <h2>Create stunning visualizations of your Spotify listening history.</h2>
            {/*<a className='button big' href={`${Globals.AUTH_ENDPOINT}?client_id=${Globals.CLIENT_ID}&redirect_uri=${Globals.REDIRECT_URI}&response_type=${Globals.RESPONSE_TYPE}&scope=${Globals.SCOPE}`}>Login with Spotify</a>*/}
            <a className='button big' onClick={action}>Visualize your own taste</a>
            <img className='exampleImage' alt='Example graph of your music listening history' src={exampleGraphImage} />
        </div>
    );
};

export default About;