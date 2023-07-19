import React from 'react';
//import React, { useEffect, useState } from 'react';
//import { TimelineLite, Power0 } from 'gsap/all';

const Logo = () => {
    /*
    useEffect(() => {
        var bt = document.querySelectorAll('#component-10')[0];
        var btTxt = bt.querySelector('.button__text');
        var btBg = bt.querySelector('.button__bg');
        var isPlaying = false;
        var turbVal = { val: 0.000001 };
        var turbValX = { val: 0.000001 };
        var turb = document.querySelectorAll('#filter-music feTurbulence')[0];
        var btTl = new TimelineLite({ paused: true, onUpdate: function() {
        turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
        },
        onComplete: function() {
        btTl.reverse();
        }, onReverseComplete: function() {
        btTl.restart();
        } });

        btTl.to(turbValX, 0.4, { val: 0.04, ease: Power0.easeNone }, 0);
        btTl.to(turbVal, 0.1, { val: 0.2 ,ease: Power0.easeNone }, 0);

    });

    const buttonClick = () => {
        if(isPlaying) {
            btTxt.textContent = 'Play';
            btTl.pause()
            var btTl2 = new TimelineLite({ onUpdate: function() {
                turb.setAttribute('baseFrequency', turbVal.val + ' ' + turbValX.val);
            } });
            btTl2.to(turbVal, 0.1, { val: 0.000001 });
            btTl2.to(turbValX, 0.1, { val: 0.000001 }, 0);
            isPlaying = false;
            btBg.style.filter = 'none';
        } else {
            btTxt.textContent = 'Pause';
            btTl.play();
            isPlaying = true;
            btBg.style.filter = 'url(#filter-music)';
        }

    };
    */

    /*
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="svg-filters">
                <defs>
                    <filter id="filter-music">
                        <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" result="warp" />
                        <feOffset dx="0" dy="-90" result="warpOffset" />
                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" htmlin="SourceGraphic" in2="warpOffset" />
                    </filter>
                </defs>
            </svg>
            <button onClick={buttonClick} id="component-10" className="button button--10">
                <span className="button__text">Play</span>
                <span className="button__bg"></span>
            </button>
        </div>
    );
    */
    return (
        <div>
        </div>
    );
};

export default Logo;
