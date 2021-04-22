import { useDispatch, useSelector } from "react-redux";
import { Card as CardComponent } from "antd";
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { favoriteAction, removeFavoriteAction } from "../store/actions/commonActions";

const Card = (obj) => {
    const object = obj.obj;
    const avatar = object.hasOwnProperty('avatar_url') ? object.avatar_url : object.hasOwnProperty('user') ? object.user.avatar_url : object.owner.avatar_url;
    const login = object.hasOwnProperty('login') ? object.login : object.hasOwnProperty('user') ? object.user.login : object.owner.login;
    const url = object.html_url;

    const dispatch = useDispatch();

    const { favorites } = useSelector((s) => s.common);
    
    console.log(favorites);

    function onFavorite (repository) {
        dispatch(favoriteAction(repository));
    } 
    
    function removeFavorite(repository) {
        dispatch(removeFavoriteAction(repository));
    }

    return (
      <CardComponent
          style={{ width: 200, margin: 10 }}
          cover={
          <img
              alt="icon"
              src={avatar}
          />
          }
          actions={[
            favorites.find((it) => it.html_url === object.html_url) ? (
            <HeartFilled onClick={() => removeFavorite(obj.obj)} />
            ) : (
            <HeartOutlined onClick={() => onFavorite(obj.obj)} />
            ),
          ]}
          > 
          <p>
              <b>@{login}</b> 
          </p>
          <p>
              <a href={url} target="blank">See More</a>
          </p>
      </CardComponent>);
}

export default Card;