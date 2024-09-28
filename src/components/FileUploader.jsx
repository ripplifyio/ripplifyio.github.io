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
            if (historyFile.processed_at != null) {
                window.location.reload();
            } else {
                setTimeout(() => checkProcessFinished(historyFileId, delay * 2), delay);
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
