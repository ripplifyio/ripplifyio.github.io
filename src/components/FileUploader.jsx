import React, { useState } from 'react';
import { uploadHistoryFile } from '../services/API';


const FileUploader = () => {
    const [uploading, setUploading] = useState(false);

    const upload = (e) => {
        setUploading(true);
        uploadHistoryFile(e.target.files[0]).then((response) => {
            console.log('This iis the response', response);
            // TODO: this probably shouldn't be here
            if (response.success) {
                localStorage.setItem('historyFileId', response.fileId);
                window.location.reload();
            }
        }).catch((error) => {
            console.log('Failed performing file upload', error);
        });
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
