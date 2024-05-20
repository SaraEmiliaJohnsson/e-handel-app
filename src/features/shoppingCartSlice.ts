import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Item } from '../types';
import { RootState } from '../main';

const initialState: CartItem[] = [];

const shoppingCartSlice = createSlice({
    name: 'shopping cart',
    initialState,
    reducers: {
        addToCart: (state: CartItem[], action: PayloadAction<Item>) => {
            const itemInCart = state.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state: CartItem[], action: PayloadAction<string>) => {
            const index = state.findIndex((item) => item.id === action.payload);
            if (index !== -1 && state[index].quantity === 1) {
                state.splice(index, 1);
            } else {
                state[index].quantity--;
            }
        },
        removeItemFromCart: (state: CartItem[], action: PayloadAction<string>) => {
            const index = state.findIndex((item) => item.id === action.payload);
            state.splice(index, 1);
        },
        clearCart: (state) => {
            state.splice(0, state.length);
        },
    },
});

export const { addToCart, removeFromCart, removeItemFromCart, clearCart } = shoppingCartSlice.actions;
export const selectTotalPrice = (state: RootState) =>
    Math.ceil(state.shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0));
export default shoppingCartSlice.reducer;
