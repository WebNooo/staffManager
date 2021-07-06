import {Button, Form, Input, message} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons'
import LoginLogo from '../../Assets/Images/worker-card.png'
import "./Login.css"
import {useContext} from "react";
import {ContextApp} from "../../reducer";
import {authUser} from "../../Common/Api";
import {AuthAction} from "../../Common/Actions";

// отдельно в LoginLayout можно вынести
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

    const onFinish = async () => {
        try {
            const response = await authUser()
            // нет смысла проверять 201 статус, со статусом ошибки и так падает в catch
            if (response.status === 201 && response.data.message === "success") {
                localStorage.setItem("sessionId", "12345678")
                AuthAction.login(dispatch)
            }
        } catch (e) {
            message.error("На сервере произошла ошибка, попробуйте позже.")
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
