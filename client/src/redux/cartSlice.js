import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartOpen: false,
        cart: []
    },
    reducers: {
        addToCart(state, action) {
            state.cartOpen = true;
            state.cart.push(action.payload);
        },
        addMultipleToCart(state, action) {
            state.cart = [...state.cart, ...action.payload]
        },
        updateCartQuantity(state, action) {
            state.cartOpen = true;
            const { productId, quantity } = action.payload;
            const product = state.cart.find(product => product._id === productId);
            if (product) {
                product.purchaseQuantity = quantity;
            }
        },
        removeFromCart(state, action) {
            state.cartOpen = state.cart.length > 1;
            state.cart = state.cart.filter(product => product._id !== action.payload);
        },
        clearCart(state) {
            state.cartOpen = false;
            state.cart = [];
        },
        toggleCart(state) {
            state.cartOpen = !state.cartOpen;
        }
    }
});

export const { addToCart, addMultipleToCart, updateCartQuantity, removeFromCart, clearCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;