import React, {useState, useEffect} from 'react';
import { Row, Card, message, Popconfirm, Button } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import { local_endpoint } from '../common/constants'
import axios from 'axios';

const Favorites = () => {
    const[favorites, setFavorites] = useState([]);

    async function deleteFavorite(id) {
        const res = await axios.delete(`${local_endpoint}/favorites/${id}`);
        if (res.status === 200) {
            message.success('Desfavoritado com sucesso!');
            getFavorites();
        } 
    }
    
    async function getFavorites() {
        const res = await axios.get(`${local_endpoint}/favorites`);
        if (res.status === 200) {
            setFavorites(res.data);
        }
    }

    useEffect(() => {
        getFavorites();
    }, []);

    return (
    <div>
        <Row>
            <a style={{ margin: 10 }} href='/'>Voltar</a>
        </Row>
        <center style={{ fontSize: 20 }}> Meus favoritos </center>
        <Row>
        {Object.keys(favorites).map(item => {
            const obj = favorites[item];
            return (
                <Card
                    style={{ width: 200, margin: 10 }}
                    cover={
                    <img
                        alt="icon"
                        src={obj.avatar}
                    />
                    }
                    actions={[
                        <Popconfirm title="Quer mesmo desfavoritar?" onConfirm={() => deleteFavorite(obj.id)} okText="Sim" cancelText="Não">
                            <Button icon={<HeartFilled />} /> 
                        </Popconfirm>
                    ]}> 
                    <p>
                        <b>@{obj.login}</b> 
                    </p>
                    <p>
                        <a href={obj.url} target="blank">See More</a>
                    </p>
                </Card>
            );
        } 
        )}
        </Row>
    </div>);
}

export default Favorites;