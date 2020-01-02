import React from 'react';
import {
    Row,
    Col,
    Typography,
    Button,
    Card,
    Input,
    Pagination,
    Select,
    Progress,
    Divider,
    Icon,
    Spin,
    message
} from 'antd'

import './Home.css';
import ListItem from './../components/ListItem';
import { useSearch } from './../hooks/hooks';
import {
    ESexKeyNames,
    ESizeKeyNames,
    EAgeKeyNames,
    ESexKey,
    ESizeKey,
    EAgeKey
} from './../enums/enums';
import { SearchResult } from './../dto/SearchDTO';

export default function() {

    const [
        search,
        setSearch,
        searchResult,
        options,
        setOptions,
        progress,
    ] = useSearch();

    let [sex_key, setSexKey] = React.useState(ESexKey.FEMALE); // defaultValue={ESexKey.FEMALE}
    let [age_key, setAgeKey] = React.useState(-1);
    let [size_key, setSizeKey] = React.useState(-1);

    return (
        <div className="home">
            <Row className="search-bar">
                <Col
                    xs={24} sm={8} md={8}
                    lg={6} xl={6}  xxl={6}
                    >
                    <Select
                        className="select-element"
                        value={sex_key}
                        onChange={ (v:number) => {
                            setAgeKey(-1);
                            setSizeKey(-1);
                            v>-1 && setSearch({sex_key:ESexKey[v]})
                            setSexKey(v);
                            } } >
                        <Select.Option value={-1}></Select.Option>
                        {Object.values(ESexKey).map(
                            (k) => !isNaN(Number(k))? <Select.Option key={k} value={k}>{ ESexKeyNames.get(Number(k)) }</Select.Option> : null
                        )}
                    </Select>
                </Col>
                <Col
                    xs={24} sm={8} md={8}
                    lg={6} xl={6}  xxl={6}
                    >
                    <Select
                        className="select-element"
                        value={size_key}
                        onChange={ (v:number) => {
                            setSexKey(-1);
                            setAgeKey(-1);
                            v>-1 && setSearch({size_key:ESizeKey[v]})
                            setSizeKey(v);
                            } } >
                        <Select.Option value={-1}></Select.Option>
                        {Object.values(ESizeKey).map(
                            (k) => !isNaN(Number(k))? <Select.Option key={k} value={k}>{ ESizeKeyNames.get(Number(k)) }</Select.Option> : null
                        )}
                    </Select>
                </Col>
                <Col
                    xs={24} sm={8} md={8}
                    lg={6} xl={6}  xxl={6}
                    >
                    <Select
                        className="select-element"
                        value={age_key}
                        onChange={ (v:number) => {
                            setSexKey(-1);
                            setSizeKey(-1);
                            v>-1 && setSearch({age_key:EAgeKey[v]});
                            setAgeKey(v);
                            } } >
                        <Select.Option value={-1}></Select.Option>
                        {Object.values(EAgeKey).map(
                            (k) => !isNaN(Number(k))? <Select.Option key={k} value={k}>{ EAgeKeyNames.get(Number(k)) }</Select.Option> : null
                        )}
                    </Select>
                </Col>

                <Col span={24}>
                    <Progress
                        percent={progress}
                        style={ progress<100 ? {opacity:1.0, transition: 'opacity 0s'} : {opacity:0.0,transition: 'opacity 2s'} }
                        />
                </Col>

            </Row>
            <Row>
                <Col span={24}>
                    <Pagination
                        pageSize={options.limit}
                        total={searchResult.count}
                        current={searchResult.page}
                        showSizeChanger
                        onChange={ (page,pageSize) => setOptions({page:page,limit:pageSize}) }
                        onShowSizeChange={ (page,pageSize) => setOptions({page:page,limit:pageSize}) }
                        />
                </Col>
            </Row>
            <Row>
                <Divider />
            </Row>
            <Row className="search-results">
                {
                    searchResult.result.map( (item: any, key: number) => <ListItem key={key} data={item} /> )
                }
                {
                    searchResult.result.length===0 ? <div className="no-one"><Icon type="frown" /></div> : null
                }
            </Row>
            <span data-testid="home"></span>
        </div>
    )
}

