import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { TimelineLite, Power0 } from 'gsap/all';
import logoImage from '../images/logo.png';

const Logo = () => {
    return (
        <div id='logo'>
            <img src={logoImage} alt='Logo' />
            <h1>Ripplify</h1>
        </div>
    );
};

export default Logo;
