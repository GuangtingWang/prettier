// Not using relative path, npm will assume it's the node_modules
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import App from './components/App';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, {}, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}><App /></Provider>,
    document.getElementById('root'));
