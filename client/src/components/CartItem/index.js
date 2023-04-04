import React from 'react';
import { idbPromise } from "../../utils/helpers";
import { removeFromCart, updateCartQuantity } from '../../redux/cartSlice'
import { useDispatch } from 'react-redux';
import { TrashIcon } from '@heroicons/react/24/solid'

const CartItem = ({ item }) => {

  const dispatch = useDispatch()

  const handleRemoveFromCart = item => {
    dispatch(removeFromCart(item._id))
    idbPromise('cart', 'delete', { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCart(item._id))
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch(updateCartQuantity({
        productId: item._id,
        quantity: parseInt(value)
      }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <img
        src={`/images/${item.image}`}
        alt=""
        className='rounded'
      />
      <div className='col-span-2 flex flex-col justify-center'>
        <span className='text-sm'>{item.name}, ${item.price}</span>
        <div className='flex gap-2'>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            className='input-primary-sm'
          />
          <button
            aria-label="trash"
            onClick={() => handleRemoveFromCart(item)}
          >
            <TrashIcon className='w-5 h-5 text-amber-500' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
