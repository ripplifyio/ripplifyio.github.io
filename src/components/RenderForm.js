import React, { useState } from 'react';

import Slider from './Slider';

import { render, getGraph } from '../services/API';

const RenderForm = ({ setGraphImage, setLoading }) => {
    const [state, setState] = useState({
        mode: 'artists',
        graphType: 'river',
        colorScheme: 'rainbow',
        silouhette: true,
        artistCount: 100,
        hiddenArtists: '',
        resolution: 'month',
        monthStart: null,
        monthEnd: null,
    });
    const [changed, setChanged] = useState(true);

    const handleChange = (event) => {
        setChanged(true);
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
    };

    let checkRenderLoop = null;

    const handleSubmit = (event) => {
        event.preventDefault();
        setChanged(false);
        setGraphImage(null);
        setLoading(true);
        render(state).then((startingGraph) => {
            checkRenderLoop = setInterval(() => {
                getGraph(startingGraph.id).then((graph) => {
                    if (graph.url) {
                        setGraphImage(graph.url);
                        setLoading(false);
                        // TODO!!!! make sure this actually stps the loop or whther there's some function we need to call
                        checkRenderLoop = null;
                    }
                });
            }, 5000);
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
                {state.graphType === 'river' && (
                    <div className='option'>
                        <label>
                            <input type='checkbox' name='sillouhette' value={true} onChange={handleChange} />
                            Force vertical symmetry?
                        </label>
                    </div>
                )}
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
                    <label htmlFor='mode'>Show...</label>
                    <select name='mode' onChange={handleChange}>
                        <option value='artists'>Top artists</option>
                        <option value='artist'>Top songs by an artist</option>
                    </select>
                </div>
                {state.mode === 'artist' && (
                    <div className='option'>
                        <label>
                            Artist to show songs from
                            <input type='text' name='artistToShow' onChange={handleChange} />
                        </label>
                    </div>
                )}
            </div>
            <div className='column'>
                <div className='option'>
                    <label>
                        Number of artists to include?
                        <Slider min={20} max={500} name='artistCount' id='artistCount' defaultValue={100} onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Artists to hide (comma separated)
                        <input type='text' name='hiddenArtists' id='hiddenArtists' onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className='column'>
                <div className='option'>
                    <label htmlFor='resolution'>Time Resolution</label>
                    <select name='resolution' onChange={handleChange}>
                        <option value='month'>Month</option>
                        <option value='week'>Week</option>
                        <option value='day'>Day</option>
                    </select>
                </div>
                <div className='option'>
                    <label>
                        Custom start month (YYYY-MM)
                        <input type='text' name='monthStart' id='monthStart' onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Custom end month (YYYY-MM)
                        <input type='text' name='monthEnd' id='monthEnd' onChange={handleChange} />
                    </label>
                </div>
            </div>
            <div className='column'>
                <input type='submit' className='accent' value='Generate Graph' disabled={!changed} />
                <p>Please note that I am actively working on developing this website. I am aware it often experiences errors and there are a bunch of features I still need to implement or debug. Some aspects of the visualization will be significantly improved (in particular I will be resolving the present issue of labels rendering in the wrong place, and making the color schemes look nicer). Thank you for your patience, and expect this website to become much more polished in the next couple weeks! Please email me at <a href='mailto:me@erikboesen.com'>me@erikboesen.com</a> with feedback or bug reports.</p>
            </div>
        </form>
    );
};

export default RenderForm;
