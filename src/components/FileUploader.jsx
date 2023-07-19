import React, { useRef } from 'react';
import { uploadHistoryFile } from '../services/API';


const FileUploader = () => {
    const upload = (e) => {
        console.log(e.target.files[0]);
        uploadHistoryFile(e.target.files[0]);
    };

    return (
        <form className='uploader'>
            <input type='file' id='historyFile' accept='.zip' hidden onInput={upload} />
            <label htmlFor='historyFile'>
                <p>Upload History File</p>
            </label>
        </form>
    );
};

export default FileUploader;
