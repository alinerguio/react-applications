/* ACTION TYPES */
export const FAVORITE = "FAVORITE";
export const REMOVE_FAVORITES = "REMOVE_FAVORITES";

/* ACTION CREATORS */
export function favoriteAction(repository) {
  return { type: FAVORITE, repository };
}

export function removeFavoriteAction(repository) {
  return { type: REMOVE_FAVORITES, repository};
}
