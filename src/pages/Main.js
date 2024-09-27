import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { selectHistoryFiles, selectHistoryFilesStatus, fetchHistoryFiles } from '../slice';

import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Viewer from '../components/Viewer';
import Loader from '../components/Loader';

import Splash from './Splash';
import Guide from './Guide';
import Login from './Login'; // New Login component
import About from './About'; // New About component

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

        if (token) {
            setLoading(true);
            load();
        } else {
            const hash = window.location.hash;
            // When Spotify allows logins
            /*
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
            */
        }
    }, []);

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <header>
                <Logo />
                <Navbar isLoggedIn={Boolean(token)} logout={logout} />
            </header>
            <Routes basename={ `/` }>
                <Route path="" element={
                    loading ? (
                        <Loader caption='Loading' />
                    ) : token ? (
                        historyFiles === null ? (
                            <Loader caption='Loading' />
                        ) : historyFiles.length > 0 ? (
                            <Viewer example={false} />
                        ) : (
                            <Guide />
                        )
                    ) : (
                        <Splash />
                    )
                } />
                <Route path="login" element={token ? <Navigate to="/" /> : <Login />} />
                <Route path="about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default Main;
