import React, { useState } from 'react';
import exampleGraphImage from '../images/example.png';

import { render }  from '../services/API';

const RenderForm = ({ setGraphImage }) => {
    const [state, setState] = useState({
        mode: 'artists',
        graphType: 'river',
        colorScheme: 'rainbow',
        silouhette: true,
        artistCount: 100,
        hiddenArtists: '',
    });
    const [changed, setChanged] = useState(true);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        render(state).then((graph) => {
            setGraphImage(graph.url);
        }).catch((error) => {
            alert(error);
        });
    };

    return (
        <form className='options' onSubmit={handleSubmit}>
            <div className='column'>
                <div className='option'>
                    <label htmlFor='graphType'>Graph type</label>
                    <select name='graphType' onChange={handleChange}>
                        <option value='river'>River</option>
                        <option value='hills'>Hills</option>
                        <option value='stretch'>Stretch</option>
                    </select>
                </div>
                <div className='option'>
                    <label htmlFor='colorScheme'>Color Scheme</label>
                    <select name='colorScheme' onChange={handleChange}>
                        <option value='rainbow'>Rainbow</option>
                        <option value='classic'>Classic</option>
                    </select>
                </div>
                {/*
                <div className='option'>
                    <label htmlFor='ordering'>Ordering</label>
                    <select name='ordering' onChange={handleChange}>
                        <option value='insideOut'>Inside-out by peak listens</option>
                        <option value='genre'>By genre</option>
                        <option value='firstListenAscending'>By first listen (ascending)</option>
                        <option value='firstListenDescending'>By first listen (decending)</option>
                    </select>
                </div>
                */}
            </div>
            <div className='column'>
                <div className='option'>
                    <label htmlFor='mode'>Rendering mode</label>
                    <select name='mode' onChange={handleChange}>
                        <option value='artists'>Top artists</option>
                        <option value='artist'>Top songs from an artist</option>
                    </select>
                </div>
                <div className='option'>
                    <label>
                        Artist to show songs from
                        <input type='text' name='artistToShow' onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        <input type='checkbox' name='sillouhette' value={true} onChange={handleChange} />
                        Weight graph to center?
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Number of artists to include?
                        <input type='range' min={20} max={500} name='artistCount' id='artistCount' defaultValue={100} onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Artists to hide (comma separated)
                        <input type='text' name='hiddenArtists' id='hiddenArtists' />
                    </label>
                </div>
            </div>
            <input type='submit' value='Generate Graph' />
        </form>
    );
};

export default RenderForm;
