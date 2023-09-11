import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistoryFiles, selectHistoryFilesStatus, fetchHistoryFiles } from '../slice';

import { authorize } from '../services/API';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Viewer from '../components/Viewer';

import Splash from './Splash';
import Guide from './Guide';

function Main() {
    const dispatch = useDispatch();
    const historyFiles = useSelector(selectHistoryFiles);
    const historyFilesStatus = useSelector(selectHistoryFilesStatus);

    const [token, setToken] = useState(null);

    const load = () => {
        console.log(historyFilesStatus);
        if (historyFilesStatus === 'idle') {
            dispatch(fetchHistoryFiles());
        }
    };

    useEffect(() => {

        const hash = window.location.hash;
        let token = localStorage.getItem('token');
        setToken(token);

        if (token) {
            load();
        } else {
            if (hash) {
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
    });

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <>
            <header>
                <Logo />
            </header>
            {!token
                ? <Splash />
                : (historyFiles !== null && historyFiles.length > 0
                        ? <Viewer example={!Boolean(token)} />
                        : <Guide />)
            }
            <Navbar isLoggedIn={Boolean(token)} logout={logout} />
        </>
    );
}

export default Main;
