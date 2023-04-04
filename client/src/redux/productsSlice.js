import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        updateProducts(state, action) {
            state.products = action.payload;
        }
    }
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;