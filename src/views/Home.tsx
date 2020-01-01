import React from 'react';
import {
    Row,
    Col,
    Typography,
    Button,
    Card,
    Input,
    Progress,
    Icon,
    Spin,
    message
} from 'antd'

import './Home.css';
import ListItem from './../components/ListItem';
import { useSearch } from './../services/services';

export default function() {

    const [ search, setSearch ] = useSearch();

    return (
        <div className="home">
            <Row className="search-bar">
                <Col>
                    <Input.Search
                        placeholder='What you find?'
                        enterButton
                        onSearch={(value: any) => setSearch({value:value})}
                        />
                    <Progress percent={100} />
                </Col>
            </Row>
            <Row className="search-results">
                {
                    [0,1,2,3,4,5,6,7,8,9].map( (item: any, key: number) => <ListItem key={key} data={item} /> )
                }
            </Row>
        </div>
    )
}

