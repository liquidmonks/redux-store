import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice for the categories
const categoriesSlice = createSlice({
    name: 'categories', // The name of the slice
    initialState: {
        categories: [], // An array of categories
        currentCategory: '' // The current selected category
    },
    reducers: {
        // A reducer function to update the list of categories
        updateCategories(state, action) {
            state.categories = action.payload; // Update the categories list
        },
        // A reducer function to update the current selected category
        updateCurrentCategory(state, action) {
            state.currentCategory = action.payload; // Update the current selected category
        },
        // A reducer function to clear the current selected category
        clearCurrentCategory(state) {
            state.currentCategory = ''; // Clear the current selected category
        }
    }
});

// Export the action creators from the slice
export const { updateCategories, updateCurrentCategory, clearCurrentCategory } = categoriesSlice.actions;

// Export the categories slice reducer
export default categoriesSlice.reducer;
