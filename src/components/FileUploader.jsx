import React, { useState } from 'react';
import { uploadHistoryFile } from '../services/API';


const FileUploader = () => {
    const [uploading, setUploading] = useState(false);

    const upload = (e) => {
        console.log(e.target.files[0]);
        setUploading(true);
        uploadHistoryFile(e.target.files[0]);
    };

    return (
        <form className='uploader'>
            <input type='file' id='historyFile' accept='.zip' hidden onInput={upload} />
            <label htmlFor='historyFile'>
                {uploading
                    ? (<p>Uploading...</p>)
                    : (<p>Upload History File</p>)}
            </label>
        </form>
    );
};

export default FileUploader;
