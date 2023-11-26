import React, { useState } from 'react';

const Loader = ({ onChange, defaultValue, caption = 'Rendering', ...props }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event);
    };

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
            <span>Rendering...</span>
        </div>
    );
};

export default Loader;
