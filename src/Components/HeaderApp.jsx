import {Button, Layout} from "antd";
import {useContext} from "react";
import {ContextApp} from "../reducer";
import {AuthAction} from "../Common/Actions";

export default function HeaderApp (){

    const {dispatch} = useContext(ContextApp)

    const {Header} = Layout

    const onLogout = () => {
        localStorage.removeItem("sessionId")
        AuthAction.logout(dispatch)
    }

    return <Header className={"header"}>
        <Button onClick={onLogout}>Выйти</Button>
    </Header>
}