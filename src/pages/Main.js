import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistoryFiles, setEmptyHistoryFile, selectHistoryFilesStatus, fetchHistoryFiles, fetchHistoryFile } from '../slice';

import { authorize } from '../services/API';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Viewer from '../components/Viewer';
import Loader from '../components/Loader';

import Splash from './Splash';
import Guide from './Guide';

function Main() {
    const dispatch = useDispatch();
    const historyFiles = useSelector(selectHistoryFiles);
    const historyFilesStatus = useSelector(selectHistoryFilesStatus);

    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);

    const load = () => {
        console.log(historyFilesStatus);
        if (historyFilesStatus === 'idle') {
            dispatch(fetchHistoryFiles());
        }
        setLoading(false);
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        setToken(token);

        let localHistoryFileId = localStorage.getItem('historyFileId');
        // TODO: can remove this logic later once we are able to make users log in
        if (localHistoryFileId) {
            //setHistoryFileId(localHistoryFileId);
            if (historyFilesStatus === 'idle') {
                dispatch(fetchHistoryFile(localHistoryFileId));
            }
        } else {
            dispatch(setEmptyHistoryFile());
        }

        if (token) {
            setLoading(true);
            load();
        } else {
            const hash = window.location.hash;
            if (hash) {
                setLoading(true);
                const spotifyToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
                console.log('Spotify token:', spotifyToken);
                authorize(spotifyToken)
                    .then((data) => {
                        console.log(data);
                        const { token } = data;
                        console.log('Our token:', token);

                        localStorage.setItem('token', token);
                        setToken(token);
                        window.location.hash = '';
                        load();
                    });
            }
        }
    }, []);

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <>
            <header>
                <Logo />
                <Navbar isLoggedIn={Boolean(token)} logout={logout} />
            </header>
            {loading
                ? (<Loader caption='Loading' />)
                // TODO: re-enable this once we get login approval
                //: (!token
                //    ? <Splash />
                    : ((historyFiles === null)
                        ? (<Loader caption='Loading' />)
                        : (historyFiles.length > 0
                            ? <Viewer example={!Boolean(token)} />
                            : <Guide />))
            }
        </>
    );
}

export default Main;
