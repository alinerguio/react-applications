import { Button, Col, Form, Input, Row, Select } from "antd";
import Card from '../components/Card';
import { useState } from "react";
import axios from "axios";
import { endpoint } from '../common/constants'


const Home = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [listSearch, setListSearch] = useState([]);
  // const [originalSearch, setOriginalSearch] = useState("");
  // const [totalCount, setTotalCount] = useState(0); 

  async function getSearch(values, per_page = 30, page = 1) {
      setLoading(true);
      const res = await axios.get(`${endpoint}/search/${values.tipo}?q=${values.valor}&per_page=${per_page}&page=${page}`);
      if (res.status === 200) {
        setListSearch(res.data.items);
        // setTotalCount(res.data.total_count);
      }
      setLoading(false);
  }

  async function onFinish(values) {
    getSearch(values);
    // setOriginalSearch(values);
  }

  // function changePage(page, pageSize) { TODO paginação
  //   getSearch(originalSearch, pageSize, page);
  // }
    
    return (
    <div>
      <Row>
        <a style={{ margin: 10 }} href='/favorites'>Meus Favoritos</a>
      </Row>
      <Form onFinish={onFinish} form={form}>
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
      {Object.keys(listSearch).map(key => {
          return (<Card key={key} obj={listSearch[key]} />);
      })
      }
      </Row>
    </div>);
}

export default Home;