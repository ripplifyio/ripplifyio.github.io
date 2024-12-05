import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { TimelineLite, Power0 } from 'gsap/all';
import logoImage from '../images/logo_color.png';

const Logo = () => {
    return (
        <a id='logo' href='/'>
            <img src={logoImage} alt='Logo' />
            <h1>Ripplify</h1>
        </a>
    );
};

export default Logo;
