import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../main';

interface CartVisibilityState {
    isCartOpen: boolean;
}

const initialState: CartVisibilityState = {
    isCartOpen: false,
};

export const cartVisibilitySlice = createSlice({
    name: 'cartVisibility',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
    },
});

export const { toggleCart } = cartVisibilitySlice.actions;

export const selectIsCartOpen = (state: RootState) => state.cartVisibility.isCartOpen;

export default cartVisibilitySlice.reducer;
