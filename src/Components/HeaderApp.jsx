import {Button, Layout} from "antd";
import {useContext} from "react";
import {ContextApp, SET_AUTH} from "../reducer";

export default function HeaderApp (){

    const {dispatch} = useContext(ContextApp)

    const {Header} = Layout

    const onLogout = () => {
        dispatch({type: SET_AUTH, auth: false})
        localStorage.removeItem("sessionId")
    }

    return <Header className={"header"}>
        <Button onClick={onLogout}>Выйти</Button>
    </Header>
}