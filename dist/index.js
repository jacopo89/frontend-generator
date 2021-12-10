import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from 'react-dom';
import './index.css';
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import { reducer as form } from 'redux-form';
import thunk from "redux-thunk";
import reportWebVitals from './reportWebVitals';
import appReducer from './redux/reducers/app/appReducer';
import verbsReducer from './redux/reducers/verbs/index';
import { createBrowserHistory } from "history";
import { Provider, useSelector } from "react-redux";
import ErrorBar from "./rendering/errors/ErrorBar";
import Test from "./frontend-tests/Test";
const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    router: connectRouter(history),
    form,
    appReducer,
    verbsReducer
    /* Add your reducers here */
}), composeEnhancers(applyMiddleware(routerMiddleware(history), thunk)));
function ThemedApp() {
    const { appReducer } = useSelector(state => state);
    return _jsxs(_Fragment, { children: [_jsx(Test, {}, void 0), _jsx(ErrorBar, {}, void 0)] }, void 0);
}
ReactDOM.render(_jsx(Provider, Object.assign({ store: store }, { children: _jsx(ConnectedRouter, Object.assign({ history: history }, { children: _jsx(ThemedApp, {}, void 0) }), void 0) }), void 0), document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
