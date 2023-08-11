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
        let user = JSON.parse(localStorage.getItem('user'));

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
                    localStorage.setItem('user', user);
                    setToken(token);
                });
        }

        setToken(token);
    }, [token]);

    const logout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };


    return (
        <div className='App'>
            <header>
                <Logo />
            </header>
            {!token
                ? <Splash />
                : (
                    <Guide />
                )
            }
            <Viewer example={!Boolean(token)} />
            <Navbar isLoggedIn={Boolean(token)} logout={logout} />
        </div>
    );
}

export default App;