import React, { useState } from 'react';
import exampleGraphImage from '../images/example.png';

import { render }  from '../services/API';

const Viewer = ({ example }) => {
    const [graphImage, setGraphImage] = useState(exampleGraphImage);

    return (
        <div className={`viewer ${example ? 'example' : ''}`}>
            <div className='options'>
                <div className='column'>
                    <div className='option'>
                        <p>Chart type</p>
                        <div className='radioGroup'>
                            <label><input type='radio' name='chartType' value='percentage' /> Percentage</label>
                            <label><input type='radio' name='chartType' value='stacked' /> Stacked</label>
                        </div>
                    </div>
                    <div className='option'>
                        <label htmlFor='colorScheme'>Color Scheme</label>
                        <select name='colorScheme' id='colorScheme'>
                            <option value='classic'>Classic</option>
                        </select>
                    </div>
                    <div className='option'>
                        <label htmlFor='ordering'>Ordering</label>
                        <select name='ordering'>
                            <option value='insideOut'>Inside-out by peak listens</option>
                            <option value='genre'>By genre</option>
                            <option value='firstListenAscending'>By first listen (ascending)</option>
                            <option value='firstListenDescending'>By first listen (decending)</option>
                        </select>
                    </div>
                    <div className='option'>
                        <label>
                            <input type='checkbox' name='sillouhette' />
                            Force graph to weight to center?
                        </label>
                    </div>
                    <div className='option'>
                        <label>
                            Number of artists to include?
                            <input type='number' name='artistCount' id='artistCount' defaultValue={100} />
                        </label>
                    </div>
                    <div className='option'>
                        <label>
                            Artist names to exclude (one per line)
                            <textarea name='excludedArtists' id='excludedArtists'></textarea>
                        </label>
                    </div>
                </div>
            </div>
            <button onClick={() => {
                render({}).then((graph) => {
                    setGraphImage(graph.url);
                });
            }}>Render</button>
            <img className='chart' src={graphImage} />
        </div>
    );
};

export default Viewer;
