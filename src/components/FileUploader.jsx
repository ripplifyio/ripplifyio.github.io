import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

import { uploadHistoryFile, getHistoryFile } from '../services/API';


const FileUploader = () => {
    const [caption, setCaption] = useState(null);

    const upload = (e) => {
        setCaption('Uploading...');
        uploadHistoryFile(e.target.files[0]).then((response) => {
            console.log('This is the response', response);
            // TODO: this probably shouldn't be here
            if (response.success) {
                setCaption('Processing...');
                checkProcessFinished(response.fileId, 4000);
            }
        }).catch((error) => {
            console.log('Failed performing file upload', error);
        });
    };

    const checkProcessFinished = (historyFileId, delay) => {
        getHistoryFile(historyFileId).then((historyFile) => {
            switch (historyFile.status) {
                case 'processed':
                    window.location.reload();
                    break;
                case 'processing':
                    setTimeout(() => checkProcessFinished(historyFileId, delay * 2), delay);
                    break;
                case 'error':
                    if (!historyFile.extended) {
                        alert('You\'ve uploaded a Spotify Account Data file, which is not the Extended Streaming History file that is required for Ripplify. Please restart this guide and pay special attention to step 3, which explains how to change the data file you\'re requesting.');
                    } else {
                        alert('An error occurred processing your file. Please check that you uploaded the correct zip and try again.');
                    }
                    break;
            }
        })
    }

    return (
        <form className='uploader'>
            <input type='file' id='historyFile' accept='.zip' hidden onInput={upload} />
            <label htmlFor='historyFile' className='accent'>
                <p>
                    <FontAwesomeIcon icon={faCloudArrowUp} />
                    {caption || 'Choose File'}
                </p>
            </label>
        </form>
    );
};

export default FileUploader;
