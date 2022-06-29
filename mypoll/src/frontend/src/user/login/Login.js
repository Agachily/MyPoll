import {Form, Input, Button, Icon, notification} from 'antd';
import {useState} from "@types/react";
import {login} from "../../util/APIUtils";
import {ACCESS_TOKEN} from "../../constants/constant";

const FormItem = Form.Item;

const Login = () => {
    const [userInfo, setUserInfo] = useState({
        usernameOrEmail: {},
        password: {}
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        const loginRequest = {
            usernameOrEmail: userInfo.usernameOrEmail.value,
            password: userInfo.password.value
        }

        login(loginRequest).then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken)
            notification.success({
                message: 'Successful Login',
                description: 'You can view your personal profile or vote now'
            })
            // Todo 加载当前用户
            // Todo 使用Redux在组件中共享用户状态
            // Todo 跳转到主页
        }).catch(error => {
            if (error.status === 401) {
                notification.error({
                    message: 'Polling App',
                    description: 'Your Username or Password'
                })
            } else {
                notification.error({
                    message: 'Polling App',
                    description: error.message || 'Sorry! Something went wrong. Please try again'
                })
            }
        })
    }

    const handleInputChange = (event) => {
        const target = event.target
        const inputName = target.name
        const inputValue = target.value

        setUserInfo({
            ...userInfo,
            [inputName]: inputValue
        })
    }

    // Todo 添加样式
    return (
        <Form onSubmit={handleSubmit}>
            <FormItem>
                <Input prefix={<Icon type="user"/>}
                       size="large"
                       name='usernameOrEmail'
                       palceholder="Username or Email"
                       value={userInfo.usernameOrEmail.value}
                       onChange={handleInputChange}/>
            </FormItem>
            <FormItem>
                <Input prefix={<Icon type="lock"/>}
                       size="large"
                       name='password'
                       type='password'
                       palceholder="Password"
                       value={userInfo.password.value}
                       onChange={handleInputChange}/>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                    Login
                </Button>
                {/*Todo 添加跳转到注册的链接*/}
            </FormItem>
        </Form>
    )
}

export default Login