import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice for the cart
const cartSlice = createSlice({
    name: 'cart', // The name of the slice
    initialState: {
        cartOpen: false, // Indicates whether the cart is open or closed
        cart: [] // An array of products in the cart
    },
    reducers: {
        // A reducer function to add a product to the cart
        addToCart(state, action) {
            state.cartOpen = true; // Set the cart open status to true
            state.cart.push(action.payload); // Add the product to the cart
        },
        // A reducer function to add multiple products to the cart
        addMultipleToCart(state, action) {
            state.cart = [...state.cart, ...action.payload]; // Add the products to the cart
        },
        // A reducer function to update the quantity of a product in the cart
        updateCartQuantity(state, action) {
            state.cartOpen = true; // Set the cart open status to true
            const { productId, quantity } = action.payload;
            const product = state.cart.find(product => product._id === productId); // Find the product in the cart
            if (product) {
                product.purchaseQuantity = quantity; // Update the quantity of the product
            }
        },
        // A reducer function to remove a product from the cart
        removeFromCart(state, action) {
            state.cartOpen = state.cart.length > 1; // Set the cart open status based on the number of products in the cart
            state.cart = state.cart.filter(product => product._id !== action.payload); // Remove the product from the cart
        },
        // A reducer function to clear all products from the cart
        clearCart(state) {
            state.cartOpen = false; // Set the cart open status to false
            state.cart = []; // Clear the products from the cart
        },
        // A reducer function to toggle the cart open status
        toggleCart(state) {
            state.cartOpen = !state.cartOpen; // Toggle the cart open status
        }
    }
});

// Export the action creators from the slice
export const { addToCart, addMultipleToCart, updateCartQuantity, removeFromCart, clearCart, toggleCart } = cartSlice.actions;

// Export the cart slice reducer
export default cartSlice.reducer;
