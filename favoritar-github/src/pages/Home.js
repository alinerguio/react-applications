import React, { useState } from 'react';
import { Form, Button, Row, Col, Input, Select } from 'antd';
import axios from 'axios';
import { endpoint } from '../common/constants'

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
                    <Select.Option key={'code'} value={'code'}>Code</Select.Option>
                    <Select.Option key={'commit'} value={'commit'}>Commit</Select.Option>
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
      {JSON.stringify(search)}
    </div>);
}

export default Home;