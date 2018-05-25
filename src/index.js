import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
//import store from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import App from './App'
import 'tachyons'
import './index.css'

// store.subscribe(() => {
//     var state = store.getState();
//     console.log(state);
// });


ReactDOM.render(
        //<Provider >
            <App />
        //</Provider>
        , document.getElementById('root'));
registerServiceWorker();
