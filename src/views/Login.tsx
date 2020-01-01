import React from 'react';
import {
    Row,
    Col,
    Typography,
    Button,
    Card,
    Input,
    Icon,
    Spin,
    message
} from 'antd'

import './Login.css';
import { login } from './../services/services';
import Config from './../config';

const { Title, Paragraph, Text } = Typography;

export default function() {

    const [email, setEmail] = React.useState('usuario-test@adopets.com');
    const [password, setPassword] = React.useState('123123');
    const [waitServer, setWaitServer] = React.useState(false);

    function doLogin() {
        setWaitServer(true);
        login(email,password).then(
            (resp) => {
                window.location.href="/";
            },
            (err) => {
                setWaitServer(false);
                message.error( 'User or password not allowed', Config.messageDuration);
            }
        );
    }

    return (
        <div className="login">
            <Row type="flex" justify="center" align="middle">
                <Col span={4}>
                    <Card title="Login" style={{ width: 300 }}>
                        <div className="loginField">
                            <Input
                                addonBefore={<Icon type="user" />}
                                value={email}
                                onChange={ (e) => setEmail(e.currentTarget.value) }
                                />
                        </div>
                        <div className="loginField">
                            <Input.Password 
                                addonBefore={<Icon type="number" />}
                                value={password}
                                onChange={ (e) => setPassword(e.currentTarget.value) }
                                />
                        </div>
                        <div >
                            {!waitServer &&
                            <Button
                                type="primary"
                                className="loginButton"
                                disabled={ (email?email:'').length<6 || (password?password:'').length<6}
                                onClick={ doLogin }
                                >
                                    Enter
                            </Button>
                            }
                            {waitServer && <Spin />}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

