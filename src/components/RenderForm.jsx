import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { faGear, faPalette, faMusic, faClock } from '@fortawesome/free-solid-svg-icons';

import OptionGroup from './OptionGroup';
import Slider from './Slider';
import HueRangeSlider from './HueRangeSlider';
import LightnessRangeSlider from './LightnessRangeSlider';

import { render, getGraph } from '../services/API';
import { selectHistoryFiles } from '../slice';

const RenderForm = ({ setGraphImage, setLoading }) => {
    const historyFiles = useSelector(selectHistoryFiles);

    const [state, setState] = useState({
        mode: 'artists',
        graphType: 'river',
        colorScheme: 'rainbow',
        backgroundColor: '111111',
        scaleColor: '333333',
        saturation: 70,
        hueRange: { min: 20, max: 320 },
        lightnessRange: { min: 10, max: 40 },
        silouhette: false,
        artistCount: 100,
        hiddenArtists: '',
        resolution: 'month',
        monthStart: null,
        monthEnd: null,
        aspectRatio: '2:1',
        historyFileId: historyFiles[0].id,
    });
    const [changed, setChanged] = useState(true);

    const getValue = (target) => {
        switch (target.type) {
            case 'number':
                return Number(target.value);
            case 'checkbox':
                return target.checked;
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

    const handleHueRangeChange = (newHueRange) => {
        setChanged(true);
        setState({
            ...state,
            hueRange: newHueRange,
        });
    };

    const handleLightnessRangeChange = (newLightnessRange) => {
        setChanged(true);
        setState({
          ...state,
          lightnessRange: newLightnessRange,
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
        submit();
    };

    const submit = () => {
        setChanged(false);
        setGraphImage(null);
        setLoading(true);
        console.log('Submit ran');
        render(state).then((startingGraph) => {
            console.log('This is startingGraph:', startingGraph);
            checkUpdate(startingGraph.id, 5000);
        }).catch((error) => {
            console.log('Received error on submission:', error);
            alert('Sorry, there was an internal error when rendering your graph. Please try again.');
            setLoading(false);
        });
    };

    useEffect(() => {
        submit();
    }, []);

    return (
        <form className='options' onSubmit={handleSubmit}>
            <div className='column'>
                <OptionGroup title='General Options' icon={faGear}>
                    <div className='option'>
                        <label htmlFor='graphType'>Graph type</label>
                        <select name='graphType' onChange={handleChange}>
                            <option value='river'>River</option>
                            <option value='stretch'>Stretch</option>
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
                </OptionGroup>
            </div>
            <div class='column'>
                <OptionGroup title='Colors' icon={faPalette}>
                    <div className='option'>
                        <label htmlFor='colorScheme'>Color Scheme</label>
                        <select name='colorScheme' onChange={handleChange}>
                            <option value='rainbow'>Rainbow</option>
                            <option value='classic'>Classic</option>
                        </select>
                    </div>
                    {state.colorScheme === 'rainbow' && (
                        <>
                            <div className='option'>
                                <label>
                                    Saturation
                                    <Slider min={0} max={100} name='saturation' defaultValue={state.saturation} onChange={handleChange} />
                                </label>
                            </div>
                            <div className='option'>
                                <label>
                                    Hue Range
                                    <HueRangeSlider
                                        value={state.hueRange}
                                        onChange={handleHueRangeChange}
                                    />
                                </label>
                            </div>
                            <div className='option'>
                                <label>
                                    Lightness Range
                                    <LightnessRangeSlider
                                        value={state.lightnessRange}
                                        onChange={handleLightnessRangeChange}
                                    />
                                </label>
                            </div>
                        </>
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
                </OptionGroup>
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
                <OptionGroup title='Artists' icon={faMusic}>
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
                        <label>
                            Number of artists to include?
                            <Slider min={20} max={500} name='artistCount' defaultValue={100} onChange={handleChange} />
                        </label>
                    </div>
                    <div className='option'>
                        <label>
                            Artists to hide (comma separated)
                            <input type='text' name='hiddenArtists' onChange={handleChange} />
                        </label>
                    </div>
                </OptionGroup>
            </div>
            <div className='column'>
                <OptionGroup title='Timeline' icon={faClock}>
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
                </OptionGroup>
            </div>
            <div className='column'>
                <input type='submit' className='accent' value='Generate Graph' disabled={!changed} />
            </div>
        </form>
    );
};

export default RenderForm;
