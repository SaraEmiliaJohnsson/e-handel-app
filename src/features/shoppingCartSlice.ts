import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Item } from '../types';
import { RootState } from '../main';

const initialState: CartItem[] = [
    {
        id: '1',
        name: 'Ett långt namn på fisken',
        price: 10.99,
        description: 'This is product 1',
        imgURL: 'https://t3.ftcdn.net/jpg/02/96/76/44/360_F_296764438_PkAqFbgU2Y9NLxGnD0IwjYUhIzOtUEKk.jpg',
        imgId: 'img1',
        title: 'Product 1',
        quantity: 2,
    },
    {
        id: '2',
        name: 'Fisk 2',
        price: 20.99,
        description: 'This is product 2',
        imgURL: 'https://images.saymedia-content.com/.image/t_share/MTg5MDUwMDg5Njc3NzkzMDk3/500-creative-fun-and-cool-names-for-your-pet-fish.jpg',
        imgId: 'img2',
        title: 'Product 2',
        quantity: 4,
    },
    {
        id: '3',
        name: 'Fisk 3',
        price: 30.99,
        description: 'This is product 3',
        imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSljryeAgjOwINqod3NwLrhfgDFe-PMLALOn_tmXWZ9-g&s',
        imgId: 'img3',
        title: 'Product 3',
        quantity: 3,
    },
];

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
        clearCart: (state) => {
            state.splice(0, state.length);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;
export const selectTotalPrice = (state: RootState) =>
    Math.ceil(state.shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0));
export default shoppingCartSlice.reducer;
