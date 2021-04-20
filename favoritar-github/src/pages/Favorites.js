import React from 'react';
import { Row } from 'antd';
// import axios from 'axios';
// import {endpoint} from '../common/constants'
// import { useHistory, useParams } from 'react-router';

const Favorites = () => {
    return (
    <div>
        <Row>
            <a style={{ margin: 10 }} href='/'>Voltar</a>
        </Row>
        <center style={{ fontSize: 20 }}> Meus favoritos </center>
    </div>);
}

export default Favorites;