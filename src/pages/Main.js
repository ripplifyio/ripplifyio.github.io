import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistoryFiles, fetchHistoryFiles } from '../slice';

import { authorize } from '../services/API';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Viewer from '../components/Viewer';

import Splash from './Splash';
import Guide from './Guide';

function Main() {
    const dispatch = useDispatch();
    const historyFiles = useSelector(selectHistoryFiles);

    const [token, setToken] = useState(null);

    const load = () => {
        dispatch(fetchHistoryFiles);
    };

    useEffect(() => {
        const hash = window.location.hash;
        let token = localStorage.getItem('token');

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

                        window.location.hash = '';
                        localStorage.setItem('token', token);
                        setToken(token);
                        load();
                    });
            }
        }

        setToken(token);
    }, [token, load]);

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const getUser = () => {

    };

    return (
        <>
            <header>
                <Logo />
            </header>
            {!token
                ? <Splash />
                : <Guide />
            }
            <Viewer example={!Boolean(token)} />
            <Navbar isLoggedIn={Boolean(token)} logout={logout} />
        </>
    );
}

export default Main;