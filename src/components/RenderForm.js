import React, { useState } from 'react';

import Slider from './Slider';

import { render, getGraph } from '../services/API';

const RenderForm = ({ setGraphImage, setLoading }) => {
    const [state, setState] = useState({
        mode: 'artists',
        graphType: 'stretch',
        colorScheme: 'rainbow',
        backgroundColor: '111111',
        scaleColor: '333333',
        saturation: 70,
        silouhette: false,
        artistCount: 100,
        hiddenArtists: '',
        resolution: 'month',
        monthStart: null,
        monthEnd: null,
        aspectRatio: '2:1',
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
            alert('Sorry, there was an internal error when rendering your graph. Please try again.');
            setLoading(false);
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
                {state.colorScheme === 'rainbow' && (
                    <div className='option'>
                        <label>
                            Saturation
                            <Slider min={0} max={100} name='saturation' id='saturation' defaultValue={70} onChange={handleChange} />
                        </label>
                    </div>
                )}
                <div className='option'>
                    <label>
                        Background color hex
                        <input type='text' name='backgroundColor' defaultValue={state.backgroundColor} onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Scale color hex
                        <input type='text' name='scaleColor' defaultValue={state.scaleColor} onChange={handleChange} />
                    </label>
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
                <div className='option'>
                    <label htmlFor='aspectRatio'>Aspect ratio (Width:Height)</label>
                    <select name='aspectRatio' onChange={handleChange}>
                        <option value='2:1'>2:1</option>
                        <option value='16:9'>16:9</option>
                        <option value='3:2'>3:2</option>
                        <option value='5:4'>5:4</option>
                        <option value='1:1'>1:1 (Square)</option>
                        <option value='4:5'>4:5</option>
                        <option value='2:3'>2:3</option>
                        <option value='9:16'>9:16</option>
                        <option value='1:2'>1:2</option>
                    </select>
                </div>
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
