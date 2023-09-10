import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './pages/Main';

import './App.css';
//import * as Globals from './Globals';

function App() {
    return (
        <Provider store={store}>
            <div className='App'>
                <Main />
            </div>
        </Provider>
    );
}

export default App;
