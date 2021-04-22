import { COLLAPSED, FAVORITE, REMOVE_FAVORITES } from "../actions/commonActions";

const initialState = { collapsed: false, favorites: [] };

function commonRoot(state = initialState, action) {
  switch (action.type) {
    case COLLAPSED:
      return { ...state, collapsed: action.collapsed };
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
