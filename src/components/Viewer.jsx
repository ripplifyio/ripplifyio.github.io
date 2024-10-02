import React, { useState } from 'react';

import RenderForm from './RenderForm';
import Placeholder from './Placeholder';

const Viewer = ({}) => {
    const [graphImage, setGraphImage] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <div className={`viewer`}>
            <RenderForm graphImage={graphImage} setGraphImage={setGraphImage} loading={loading} setLoading={setLoading} />
            {graphImage
                ? (<img className='graph' alt='Graph of your music listening history' src={graphImage} />)
                : (<Placeholder loading={loading} />)}
        </div>
    );
};

export default Viewer;
