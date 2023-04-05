import React, { useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useSelector, useDispatch } from 'react-redux'
import { toggleCart, addMultipleToCart } from '../../redux/cartSlice'
import { XMarkIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'

//public key
const stripePromise = loadStripe('pk_test_51LdI3iLu7w1vosGntvG5ExAIBTSZ5IHbuXDHD0k5q7wlzUCFlDueeZhuiE3oour8bHOjAW1Y6wDogvvobA2YKqcY00Spmx8626');


const Cart = () => {
  const cart = useSelector(state => state.cart.cart)
  const [getCheckout, { data, loading }] = useLazyQuery(QUERY_CHECKOUT);
  const cartOpen = useSelector((state) => state.cart.cartOpen)
  const dispatch = useDispatch()
  const cartRef = useRef(null);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch(addMultipleToCart(cart));
    }

    if (!cart.length) {
      getCart();
    }
  }, [cart.length, dispatch]);

  function handleToggleCart() {
    dispatch(toggleCart())
  }

  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartOpen && cartRef.current && !cartRef.current.contains(event.target)) {
        dispatch(toggleCart())
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [cartOpen, dispatch]);

  return (
    <>
      <button className="cart-icon" onClick={handleToggleCart}>
        <ShoppingBagIcon className='w-7 h-7 text-eerie' />
      </button>

      <div className={`cart-container ${cartOpen ? 'cart-container-open' : ''}`}>
        <div className='cart-inner'>

          <div ref={cartRef} className={`cart ${cartOpen ? 'cart-open' : ''}`}>
            <div className='flex items-center justify-between mb-4'>
              <h3>Shopping Cart</h3>
              <button onClick={handleToggleCart}>
                <XMarkIcon className='w-7 h-7' />
              </button>
            </div>
            {cart.length ? (
              <div className='flex flex-col gap-5'>
                {cart.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}

                <div className="flex items-center justify-between">
                  <strong>Total: ${calculateTotal()}</strong>

                  {Auth.loggedIn() ? (
                    <button disabled={loading} onClick={submitCheckout} className='btn btn-primary'>Checkout</button>
                  ) : (
                    <span>(log in to check out)</span>
                  )}
                </div>
              </div>
            ) : (
              <div className='flex items-center justify-center w-full h-full'>
                <p>Your cart is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default Cart;
