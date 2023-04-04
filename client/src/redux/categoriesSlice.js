import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        updateCategories(state, action) {
            state.categories = action.payload;
        },
        updateCurrentCategory(state, action) {
            state.currentCategory = action.payload;
        },
        clearCurrentCategory(state) {
            state.currentCategory = ''
        }
    }
});

export const { updateCategories, updateCurrentCategory, clearCurrentCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;