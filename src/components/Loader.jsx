import React from 'react';

const Loader = ({ caption = 'Rendering', center = true, ...props }) => {
    return (
        <div className={'loader' + (center ? ' center' : '')}>
            <div className='bars'>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </div>
            <span>{caption}...</span>
        </div>
    );
};

export default Loader;
