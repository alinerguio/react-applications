import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Input, Select } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useHistory } from 'react-router';
import axios from 'axios';
import { endpoint, local_endpoint } from '../common/constants'


const Home = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState([]);

    const history = useHistory();

    async function getSearch(values) {
        setLoading(true);
        const res = await axios.get(`${endpoint}/search/${values.tipo}?q=${values.valor}`);
        if (res.status === 200) {
            const items = res.data.items;
      
            const promises = items.map(item => verifyFavorite(item.html_url));

            const favoriteData = await Promise.all(promises);

            const itemsComplete = items.map(
                item => ({ ...item, isFavorite: favoriteData.find(fav => fav.url === item.html_url).value })
            );

            setSearch(itemsComplete);
        }
        setLoading(false);
    }

    async function onFavorite (avatar, login, url, values) {
        const id = new Date();
        await axios.post(`${local_endpoint}/favorites`, { id, url, login, avatar });
        history.push('/favorites');
    } 

    async function verifyFavorite(url) {
        const res = await axios.get(`${local_endpoint}/favorites?url=${url}`);
        if (res.data.length === 0) {
          return {url, value: false};
        }
        return {url, value: true};
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
                <Select placeholder="Selecione">
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
      <Row loading={loading}>
      {Object.keys(search).map(item => {
          const obj = search[item];
          const avatar = obj.hasOwnProperty('avatar_url') ? obj.avatar_url : obj.hasOwnProperty('user') ? obj.user.avatar_url : obj.owner.avatar_url;
          const login = obj.hasOwnProperty('login') ? obj.login : obj.hasOwnProperty('user') ? obj.user.login : obj.owner.login;
          const url = obj.html_url;

          return (
            <Card
                style={{ width: 200, margin: 10 }}
                cover={
                <img
                    alt="icon"
                    src={avatar}
                />
                }
                actions={[
                    <div>
                        {obj.isFavorite ? <HeartFilled style={{ cursor: 'not-allowed' }} /> : <button onClick={() => onFavorite(avatar, login, url)} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}> <HeartOutlined /> </button>}
                    </div>
                ]}> 
                <p>
                    <b>@{login}</b> 
                </p>
                <p>
                    <a href={url} target="blank">See More</a>
                </p>
            </Card>
        );
      } 
      )}
      </Row>
    </div>);
}

export default Home;