import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice for the products
const productsSlice = createSlice({
    name: 'products', // The name of the slice
    initialState: {
        products: [] // An array of products
    },
    reducers: {
        // A reducer function to update the list of products
        updateProducts(state, action) {
            state.products = action.payload; // Update the products list
        }
    }
});

// Export the action creators from the slice
export const { updateProducts } = productsSlice.actions;

// Export the products slice reducer
export default productsSlice.reducer;
