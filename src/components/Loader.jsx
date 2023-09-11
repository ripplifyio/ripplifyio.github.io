import React, { useState } from 'react';

const Loader = ({ onChange, defaultValue, ...props }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event);
    };

    return (
        <div className='loader'>
            <span>Loading</span>
        </div>
    );
};

export default Loader;
