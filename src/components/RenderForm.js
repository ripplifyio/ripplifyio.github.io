import React, { useState } from 'react';
import exampleGraphImage from '../images/example.png';

import { render }  from '../services/API';

const RenderForm = ({ setGraphImage }) => {
    const [state, setState] = useState({

    });

    const handleChange = (event) => {
        setState({value: event.target.value});
    };

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + state.value);
        event.preventDefault();
        render(state).then((graph) => {
            setGraphImage(graph.url);
        });
    };

    return (
        <form className='options' onSubmit={handleSubmit}>
            <div className='column'>
                <div className='option'>
                    <p>Chart type</p>
                    <div className='radioGroup'>
                        <label><input type='radio' name='chartType' value='percentage' onChange={handleChange} /> Percentage</label>
                        <label><input type='radio' name='chartType' value='stacked' onChange={handleChange} /> Stacked</label>
                    </div>
                </div>
                <div className='option'>
                    <label htmlFor='colorScheme'>Color Scheme</label>
                    <select name='colorScheme' id='colorScheme' onChange={handleChange}>
                        <option value='classic'>Classic</option>
                    </select>
                </div>
                <div className='option'>
                    <label htmlFor='ordering'>Ordering</label>
                    <select name='ordering' onChange={handleChange}>
                        <option value='insideOut'>Inside-out by peak listens</option>
                        <option value='genre'>By genre</option>
                        <option value='firstListenAscending'>By first listen (ascending)</option>
                        <option value='firstListenDescending'>By first listen (decending)</option>
                    </select>
                </div>
                <div className='option'>
                    <label>
                        <input type='checkbox' name='sillouhette' onChange={handleChange} />
                        Force graph to weight to center?
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Number of artists to include?
                        <input type='number' name='artistCount' id='artistCount' defaultValue={100} onChange={handleChange} />
                    </label>
                </div>
                <div className='option'>
                    <label>
                        Artist names to exclude (one per line)
                        <textarea name='excludedArtists' id='excludedArtists'></textarea>
                    </label>
                </div>
                <input type="submit" value="Generate Graph" />
            </div>
        </form>
    );
};

export default RenderForm;
