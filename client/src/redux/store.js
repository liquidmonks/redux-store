import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice' // Import the cart slice reducer
import categoriesReducer from './categoriesSlice' // Import the categories slice reducer
import productsReducer from './productsSlice' // Import the products slice reducer

// Configure and create the Redux store
export default configureStore({
    reducer: {
        // Combine all the slice reducers into a single object
        cart: cartReducer,
        categories: categoriesReducer,
        products: productsReducer
    },
})
