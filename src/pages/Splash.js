import React from 'react';
import { Link } from 'react-router-dom';
import exampleGraphImage1 from '../images/example1.png';
import exampleGraphImage2 from '../images/example2.png';
import exampleGraphImage3 from '../images/example3.png';
import exampleGraphImage4 from '../images/example4.png';

import '../css/Splash.css';

const Splash = () => {
    return (
        <div className='splash'>
            <div className='splashHeader'>
                <h2>Create stunning visualizations of your Spotify listening history.</h2>
                {/*Spotify login:
                <a className='button big' href={`${Globals.AUTH_ENDPOINT}?client_id=${Globals.CLIENT_ID}&redirect_uri=${Globals.REDIRECT_URI}&response_type=${Globals.RESPONSE_TYPE}&scope=${Globals.SCOPE}`}>Login with Spotify</a>*/}
                {/*<a className='button big' onClick={action}>Visualize your own taste</a>*/}
                <p>Ripplify graphs how your choice of artists has evolved through your life, capturing how every moment has interacted with your music.</p>
                <Link className='button big' to='/login'>Visualize your own taste!</Link>
            </div>
            <div class='exampleRow'>
                <img alt='Example graph of music listening history' src={exampleGraphImage3} />
                <img alt='Example graph of music listening history' src={exampleGraphImage1} />
                <img alt='Example graph of music listening history' src={exampleGraphImage2} />
                <img alt='Example graph of music listening history' src={exampleGraphImage4} />
            </div>
            <div className='background'></div>
        </div>
    );
};

export default Splash;
