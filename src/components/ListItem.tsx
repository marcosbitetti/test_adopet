import React from 'react';
import {
    Col,
    Typography,
    Button,
    Card,
    Input,
    Progress,
    Icon,
    Spin,
    Popconfirm,
    message
} from 'antd'

import Config from './../config';
import {
    ESexKeyNames,
    ESizeKeyNames,
    EAgeKeyNames,
    ESexKey,
    ESizeKey,
    EAgeKey
} from './../enums/enums';

import './ListItem.css';

export default function(props: any) {
    const { data } = props;

    return (
        <Col
            className="list-item"
            xs={24}
            sm={12}
            md={12}
            lg={6}
            xl={3}
            xxl={3}
            >
            <Card
                title={ <span><Icon type="github" className="icon" /> {data.name}</span> }
                extra={
                    <Popconfirm
                        title="Let's go to adopt?"
                        onConfirm={ () => console.log('ok') }
                        okText="Yes!"
                        cancelText="no"
                        >
                        <a href="#">Actions</a>
                    </Popconfirm>
                }
                className="item-card"
                >
                <ul>
                    <li>
                        <strong>Age:</strong>
                        <span>{ EAgeKeyNames.get(Number(EAgeKey[data.age_key])) }</span>
                    </li>
                    <li>
                        <strong>Sex:</strong>
                        <span>{ ESexKeyNames.get(Number(ESexKey[data.sex_key])) }</span>
                    </li>
                    <li>
                        <strong>Size:</strong>
                        <span>{ ESizeKeyNames.get(Number(ESizeKey[data.size_key])) }</span>
                    </li>
                    <li
                        style={{ color: data.status_key==='AVAILABLE' ? 'green':'red' }}
                        >
                        <strong>Status:</strong>
                        <span>{ data.status_key }</span>
                    </li>
                </ul>
            </Card>
        </Col>
    )
}


