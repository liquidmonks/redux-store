import productsReducer, { updateProducts } from '../redux/productsSlice'
import cartReducer, { addMultipleToCart, addToCart, clearCart, removeFromCart, toggleCart, updateCartQuantity } from '../redux/cartSlice'
import categoriesReducer, { clearCurrentCategory, updateCategories, updateCurrentCategory } from '../redux/categoriesSlice'

const initialState = {
  products: [],
  cart: [
    {
      _id: '1',
      name: 'Soup',
      purchaseQuantity: 1
    },
    {
      _id: '2',
      name: 'Bread',
      purchaseQuantity: 2
    }
  ],
  cartOpen: false,
  categories: [{ name: 'Food' }],
  currentCategory: '1',
}

test("UPDATE_PRODUCTS", () => {
  const newState = productsReducer(initialState, updateProducts([{}, {}]))
  expect(newState.products.length).toBe(2)
  expect(initialState.products.length).toBe(0)
})

test('ADD_TO_CART', () => {
  const newState = cartReducer(initialState, addToCart({ purchaseQuantity: 1 }))

  expect(newState.cart.length).toBe(3)
  expect(initialState.cart.length).toBe(2)
})

test('UPDATE_CART_QUANTITY', () => {
  const newState = cartReducer(initialState, updateCartQuantity({ productId: '1', quantity: 3 }))

  expect(newState.cartOpen).toBe(true)
  expect(newState.cart[0].purchaseQuantity).toBe(3)
  expect(newState.cart[1].purchaseQuantity).toBe(2)
  expect(initialState.cartOpen).toBe(false)
})

test('REMOVE_FROM_CART', () => {
  const newState1 = cartReducer(initialState, removeFromCart('1'))

  expect(newState1.cartOpen).toBe(true)
  expect(newState1.cart.length).toBe(1)
  expect(newState1.cart[0]._id).toBe('2')

  const newState2 = cartReducer(newState1, removeFromCart('2'))

  expect(newState2.cartOpen).toBe(false)
  expect(newState2.cart.length).toBe(0)
  expect(initialState.cart.length).toBe(2)
})

test('ADD_MULTIPLE_TO_CART', () => {
  const newState = cartReducer(initialState, addMultipleToCart([{}, {}]))

  expect(newState.cart.length).toBe(4)
  expect(initialState.cart.length).toBe(2)
})

test('UPDATE_CATEGORIES', () => {
  const newState = categoriesReducer(initialState, updateCategories([{}, {}]))

  expect(newState.categories.length).toBe(2)
  expect(initialState.categories.length).toBe(1)
})

test('UPDATE_CURRENT_CATEGORY', () => {
  const newState = categoriesReducer(initialState, updateCurrentCategory('2'))

  expect(newState.currentCategory).toBe('2')
  expect(initialState.currentCategory).toBe('1')
})

test('CLEAR_CURRENT_CATEGORY', () => {
  const newState = categoriesReducer(initialState, clearCurrentCategory())

  expect(newState.currentCategory).toBe('')
  expect(initialState.currentCategory).toBe('1')
})

test('CLEAR_CART', () => {
  const newState = cartReducer(initialState, clearCart())

  expect(newState.cartOpen).toBe(false)
  expect(newState.cart.length).toBe(0)
  expect(initialState.cart.length).toBe(2)
})

test('TOGGLE_CART', () => {
  const newState = cartReducer(initialState, toggleCart())

  expect(newState.cartOpen).toBe(true)
  expect(initialState.cartOpen).toBe(false)

  const newState2 = cartReducer(newState, toggleCart())

  expect(newState2.cartOpen).toBe(false)
})