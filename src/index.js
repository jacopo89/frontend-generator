import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router';
import {reducer as form} from 'redux-form';
import thunk from "redux-thunk";
import reportWebVitals from './reportWebVitals';
import appReducer from './redux/reducers/app/appReducer';
import verbsReducer from './redux/reducers/verbs/index';
import {createBrowserHistory} from "history";
import {Provider, useSelector} from "react-redux";
import ErrorBar from "./rendering/errors/ErrorBar";

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        router: connectRouter(history),
        form,
        appReducer,
        verbsReducer
        /* Add your reducers here */
    }),
    composeEnhancers(
        applyMiddleware(routerMiddleware(history),thunk)
    )
);


function ThemedApp(){
    const {appReducer} = useSelector(state=>state);
    return  <>
        <App />
        <ErrorBar/>
        </>
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ThemedApp/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
