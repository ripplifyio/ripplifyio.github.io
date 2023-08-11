import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { TimelineLite, Power0 } from 'gsap/all';
import logoImage from '../images/logo.png';

const Logo = () => {
    return (
        <>
            <img src={logoImage} id="logo" alt="Logo" />
            <h1>Ripplify</h1>
        </>
    );
};

export default Logo;
