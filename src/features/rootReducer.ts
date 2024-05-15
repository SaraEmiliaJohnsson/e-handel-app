import { combineReducers } from 'redux';
import shoppingCartReducer from './shoppingCartSlice';

export const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
});
