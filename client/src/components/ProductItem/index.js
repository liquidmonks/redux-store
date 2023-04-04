import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQuantity } from '../../redux/cartSlice'

function ProductItem(item) {
  const { image, name, _id, price, quantity, canAdd = true } = item;

  const cart = useSelector(state => state.cart.cart)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch(updateCartQuantity({
        productId: _id,
        quantity: parseInt(itemInCart.purchaseQuantity) + 1
      }))
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addToCart({ ...item, purchaseQuantity: 1 }))
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="shadow-sm border rounded-md max-w-[20rem]">
      <Link to={`/products/${_id}`} className='group'>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p className="px-2 mt-3 group-hover:underline group-hover:text-amber-500">{name}</p>
      </Link>
      <div className="px-2 mb-2 flex flex-col">
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
        {
          canAdd ? <button className="btn-primary flex-grow-0 w-fit text-sm mt-4" onClick={handleAddToCart}>Add to cart</button>
            : null
        }
      </div>
    </div>
  );
}

export default ProductItem;
