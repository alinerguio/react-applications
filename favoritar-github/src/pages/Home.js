import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Input, Select } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import axios from 'axios';
import { endpoint } from '../common/constants'

const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const Home = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState([]);

    async function getSearch(values) {
        setLoading(true);
        const res = await axios.get(`${endpoint}/search/${values.tipo}?q=${values.valor}`);
        if (res.status === 200) {
            setSearch((res.data).items);
        }
        setLoading(false);
    }

    return (
    <div>
      <Row>
        <a style={{ margin: 10 }} href='/favorites'>Meus Favoritos</a>
      </Row>
      <Form onFinish={getSearch} form={form}>
        <Row>
          <Col sm={8}> 
            <Form.Item name="tipo" rules={[{ required: true, message: "Campo Obrigatório!" }]} style={{ margin: 10 }}> 
                {/* <Select placeholder="Selecione" loading={loading}> */}
                <Select placeholder="Selecione">
                    {/* Se tiver tempo, retomar: (endpoint com substring search){searchTypes.map(search => (
                        // if(Object.keys(opcao).indexOf('search') > -1) {
                        //     console.log(opcao);
                        // }
                        <Select.Option key={search} value={search}>{search}</Select.Option>
                    ))} */}
                    {/* <Select.Option key={'code'} value={'code'}>Code</Select.Option>
                    <Select.Option key={'commit'} value={'commit'}>Commit</Select.Option> */}
                    <Select.Option key={'issues'} value={'issues'}>Issues</Select.Option>
                    <Select.Option key={'repositories'} value={'repositories'}>Repositories</Select.Option>
                    <Select.Option key={'users'} value={'users'}>Users</Select.Option>
                </Select>
            </Form.Item>
          </Col>
          <Col sm={8}>
            <Form.Item name="valor" rules = {[{ required: true, message: "Campo Obrigatório." }]} style={{ margin: 10 }}>
              <Input/>
            </Form.Item>
          </Col>
          <Col sm={4}>
            <Button htmlType="submit" style={{ margin: 10 }}> Buscar </Button>
          </Col>
        </Row>   
      </Form>
      <Row>
      {Object.keys(search).map((item, index) => {
          const obj = search[item];
          return (
            <Card
                style={{ width: 200, margin: 10 }}
                cover={
                <img
                    alt="icon"
                    src={obj.hasOwnProperty('avatar_url') ? obj.avatar_url : obj.hasOwnProperty('user') ? obj.user.avatar_url : obj.owner.avatar_url}
                />
                }
                actions={[
                <HeartOutlined key="favorite" />
                ]}> 
                <p>
                    <b>@{obj.hasOwnProperty('login') ? obj.login : obj.hasOwnProperty('user') ? obj.user.login : obj.owner.login}</b> 
                </p>
                <p>
                    <a href={obj.html_url} target="blank">See More</a>
                </p>
            </Card>
        );
      } 
      )}
      </Row>
    </div>);
}

export default Home;