import React from 'react';
import { idbPromise } from "../../utils/helpers";

//! CONTEXT
// import { useStoreContext } from "../../utils/GlobalState";
// import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
//| REDUX
import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  updateCartQty
} from '../../app/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCartFxn = item => {
    dispatch(removeFromCart(item._id));
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch(removeFromCart(item._id))
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch(updateCartQty(item._id, parseInt(value)));
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }

  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCartFxn(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;