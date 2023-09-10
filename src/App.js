import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHistoryFiles, fetchHistoryFiles } from './slice';

import './App.css';
//import * as Globals from './Globals';
import { authorize } from './services/API';

import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Viewer from './components/Viewer';

import Splash from './pages/Splash';
import Guide from './pages/Guide';

function App() {
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
    }, [token]);

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const getUser = () => {

    };

    return (
        <Provider store={store}>
            <div className='App'>
                <header>
                    <Logo />
                    <h1>Ripplify</h1>
                </header>
                {!token
                    ? <Splash />
                    : <Guide />
                }
                <Viewer example={!Boolean(token)} />
                <Navbar isLoggedIn={Boolean(token)} logout={logout} />
            </div>
        </Provider>
    );
}

export default App;
