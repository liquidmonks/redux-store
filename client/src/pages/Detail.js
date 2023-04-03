import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartQuantity } from '../redux/cartSlice'
import { updateProducts } from '../redux/productsSlice'
import Spinner from '../components/Sipnner';

function Detail() {
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = useSelector(state => state.products.products)
  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch(updateProducts(data.products))

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(data.indexedProducts))
      });
    }
  }, [products, data, loading, dispatch, id]);

  const handleaddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(updateCartQuantity({
        productId: id,
        quantity: parseInt(itemInCart.purchaseQuantity) + 1,
      }))
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }))
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(currentProduct._id))

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && loading ? <Spinner /> :
        cart ? (
          <div className="container mx-auto px-2 py-5">
            <Link to="/" className='link'>← Back to Products</Link>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
              <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
                className='max-w-full rounded-lg'
              />
              <div className='lg:col-span-2'>
                <h2>{currentProduct.name}</h2>

                <p>{currentProduct.description}</p>

                <span className='text-lg mb-5'>
                  <strong>Price:</strong>${currentProduct.price}
                </span>
                <div className='flex items-center flex-wrap gap-3 mb-5'>
                  <button className='btn-primary' onClick={handleaddToCart}>Add to Cart</button>
                  <button
                    className='btn-primary'
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={handleRemoveFromCart}
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : null}
      <Cart />
    </>
  );
}

export default Detail;
