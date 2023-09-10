import React, { useState } from 'react';

import { render }  from '../services/API';

const Slider = ({ onChange, defaultValue, ...props }) => {
    const [value, setValue] = useState(defaultValue);

    const handleChange = (event) => {
        setValue(event.target.value);
        onChange(event);
    };

    return (
        <div className='slider'>
            <input type='range' defaultValue={defaultValue} onChange={handleChange} {...props} />
            <span>{value}</span>
        </div>
    );
};

export default Slider;
