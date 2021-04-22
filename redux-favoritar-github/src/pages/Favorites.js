import { useSelector } from "react-redux";
import Card from '../components/Card';
import { Row } from 'antd';


const Favorites = () => {

    const { favorites } = useSelector((s) => s.common);

    return (
    <div>
        <Row>
            <a style={{ margin: 10 }} href='/'>Voltar</a>
        </Row>
        <center style={{ fontSize: 20 }}> Meus favoritos </center>
        <Row>
            {Object.keys(favorites).map(key => {
                return (<Card key={key} obj={favorites[key]} />);
            })
            }
        </Row>
    </div>);
}

export default Favorites;