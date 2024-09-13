import React, { useState } from 'react';

import Slider from './Slider';

import { render, getGraph } from '../services/API';

const RenderForm = ({ setGraphImage, setLoading }) => {
    const [state, setState] = useState({
        mode: 'artists',
        graphType: 'stretch',
        colorScheme: 'rainbow',
        silouhette: true,
        artistCount: 100,
        hiddenArtists: '',
        resolution: 'month',
        monthStart: null,
        monthEnd: null,
        historyFileId: localStorage.historyFileId,
    });
    const [changed, setChanged] = useState(true);

    const getValue = (target) => {
        switch (target.type) {
            case 'number':
                return Number(target.value);
                break;
            case 'checkbox':
                return target.checked;
                break;
            default:
                return target.value;
        }
    };

    const handleChange = (event) => {
        setChanged(true);
        setState({
            ...state,
            [event.target.name]: getValue(event.target),
        });
    };

    const checkUpdate = (graphId, delay) => {
        setTimeout(() => {
            getGraph(graphId).then((graph) => {
                if (graph.url) {
                    setGraphImage(graph.url);
                    setLoading(false);
                    clearInterval(checkRenderInterval);
                } else {
                    checkUpdate(graphId, delay * 2);
                }
            })
        }, delay);
   };

    let checkRenderInterval = null;

    const handleSubmit = (event) => {
        event.preventDefault();
        setChanged(false);
        setGraphImage(null);
        setLoading(true);
        render(state).then((startingGraph) => {
            console.log('This is startingGraph:', startingGraph);
            checkUpdate(startingGraph.id, 5000);
        }).catch((error) => {
            console.log('Received error on submission:', error);
            alert(error.message);
        });
    };

    return (
        <form className='options' onSubmit={handleSubmit}>
            <div className='column'>
                <div className='option'>
                    <label htmlFor='graphType'>Graph type</label>
                    <select name='graphType' onChange={handleChange}>
                        <option value='stretch'>Stretch</option>
                        <option value='river'>River</option>
                        <option value='hills'>Hills</option>
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
            </div>
        </form>
    );
};

export default RenderForm;
