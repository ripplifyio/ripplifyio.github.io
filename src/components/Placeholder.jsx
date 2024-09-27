import React, { useState } from 'react';

import Loader from './Loader';

const Placeholder = ({loading}) => {
    return (
        <div className={'placeholder' + (loading ? ' loading' : '')}>
            {loading ? <Loader center={false} /> : <span>Click Generate to view your history!</span>}
        </div>
    );
};

export default Placeholder;
