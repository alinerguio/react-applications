import { FAVORITE, REMOVE_FAVORITES } from "../actions/commonActions";

const initialState = { favorites: [] };

function commonRoot(state = initialState, action) {
  switch (action.type) {
    case FAVORITE:
      if (!state.favorites) state.favorites = [];
      const newFavorites = [...state.favorites, action.repository];
      return { ...state, favorites: newFavorites };
    case REMOVE_FAVORITES:
      const favoritesList = [...state.favorites];
      const index = favoritesList.findIndex((item) => item.id === action.repository);
      favoritesList.splice(index, 1);
      return { ...state, favorites: favoritesList };
    default:
      return state; 
  }
}

export default commonRoot;
