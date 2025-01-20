import { combineReducers } from '@reduxjs/toolkit';
import pokemonFavoriteReducer from '../slices/pokemonFavoriteSlice'
import authReducer from '../slices/authSlice'
const rootReducer = combineReducers({
    pokemonFavorite: pokemonFavoriteReducer,
    auth:authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
