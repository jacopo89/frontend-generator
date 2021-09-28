import React from 'react';
import './App.css';
import Test from "./Test";
import {CookiesProvider} from "react-cookie";

function App() {
    return <CookiesProvider>
        <Test/>
    </CookiesProvider>
}

export default App;