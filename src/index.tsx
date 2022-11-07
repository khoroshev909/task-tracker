import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from './store';
import App from './App';
import './style.css'

const store = setupStore()

// В библиотеке history 4.9.0 вместо BrowserRouter используется <Router value={history} />
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>,
    </Provider>,
document.getElementById('root')
);


