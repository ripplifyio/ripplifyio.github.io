import React, { useState } from 'react';
import exampleGraphImage from '../images/example.png';

import { render }  from '../services/API';

import RenderForm from './RenderForm';

const Viewer = ({ example }) => {
    const [graphImage, setGraphImage] = useState(exampleGraphImage);

    return (
        <div className={`viewer ${example ? 'example' : ''}`}>
            <RenderForm setGraphImage={setGraphImage} />
            <img className='chart' src={graphImage} />
        </div>
    );
};

export default Viewer;
