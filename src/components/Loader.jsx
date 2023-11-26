import React from 'react';

const Loader = ({ caption = 'Rendering', ...props }) => {
    return (
        <div className='loader'>
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
