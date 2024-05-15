import { combineReducers } from 'redux';
import shoppingCartReducer from './shoppingCartSlice';
import cartVisibilitySlice from './cartVisibilitySlice';

export const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    cartVisibility: cartVisibilitySlice,
});
