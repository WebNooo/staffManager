import {Button, Form, Input} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import LoginLogo from '../../Assets/Images/worker-card.png'
import "./Login.css"
import {useContext} from "react";
import {ContextApp, SET_AUTH} from "../../reducer";
import {authUser} from "../../Common/Api";

export default function Login() {


    return <div className="login">
        <div className="login_wrap">
            <img className="login_logo" src={LoginLogo} alt=""/>
            <LoginForm/>
        </div>
    </div>
}

function LoginForm() {

    const {dispatch} = useContext(ContextApp);

    const onFinish = async (values) => {
        try {
            const response = await authUser()
            if (response.status === 201 && response.data.message === "success") {
                dispatch({type: SET_AUTH, auth: true})
                localStorage.setItem("sessionId", "12345678")
            }
        } catch (e) {
            throw new Error(e)
        }
    }

    return <Form name="LoginForm" className="login_form" onFinish={onFinish}>
        <h1 className="login_text m-24">Войти в систему</h1>
        <Form.Item className="m-24" name="username">
            <Input prefix={<UserOutlined className='icon_color'/>} placeholder={"Логин"}/>
        </Form.Item>

        <Form.Item className="m-24" name="password">
            <Input.Password prefix={<LockOutlined className='icon_color'/>} placeholder={"Пароль"}/>
        </Form.Item>

        <Form.Item className="m-24">
            <Button type="primary" htmlType="submit" className='login_btn'>Log in</Button>
        </Form.Item>
    </Form>
}
