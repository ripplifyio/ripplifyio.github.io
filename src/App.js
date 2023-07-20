import React, { useEffect, useState } from 'react';

import './App.css';
//import * as Globals from './Globals';
import { authorize } from './services/API';

import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Viewer from './components/Viewer';

import Splash from './pages/Splash';
import Guide from './pages/Guide';

function App() {
    const [token, setToken] = useState('');

    useEffect(() => {
        const hash = window.location.hash;
        let token = localStorage.getItem('token');

        if (!token && hash) {
            const spotifyToken = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
            console.log('Spotify token:', spotifyToken);
            authorize(spotifyToken)
                .then((data) => {
                    console.log(data);
                    const { user, token } = data;
                    console.log('Our token:', token);

                    window.location.hash = '';
                    localStorage.setItem('token', token);
                    setToken(token);
                });
        }

        setToken(token);
    }, [token]);

    const logout = () => {
        setToken('');
        window.localStorage.removeItem('token');
    }


    return (
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
    );
}

export default App;
