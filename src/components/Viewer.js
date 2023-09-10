import React, { useState } from 'react';

import RenderForm from './RenderForm';

const Viewer = ({ example }) => {
    const [graphImage, setGraphImage] = useState(null);

    return (
        <div className={`viewer ${example ? 'example' : ''}`}>
            <RenderForm setGraphImage={setGraphImage} />
            <img className='chart' alt='Graph of your music listening history' src={graphImage} />
        </div>
    );
};

export default Viewer;
