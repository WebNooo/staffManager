import 'antd/dist/antd.css'
import './App.css';
import React, {useReducer} from "react";
import Login from "./Components/Login/Login";
import {ContextApp, Reducer, initialState} from "./reducer";
import Main from "./Components/Main";
import {AuthAction} from "./Common/Actions";

function App() {

    const [state, dispatch] = useReducer(Reducer, initialState);

    if (localStorage.getItem("sessionId") && !state.isAuth) {
        AuthAction.login(dispatch)
    }

    return <ContextApp.Provider value={{dispatch, state}}>
        {!state.isAuth ? <Login/> : <Main/>}
    </ContextApp.Provider>
}

export default App;
