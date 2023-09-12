import React from "react";
import "./CartItem.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/Slices/cartSlice";

function CartItem({ cart }) {
  const dispatch = useDispatch();
  return (
    <div className="CartItem container">
      <div className="item-img">
        <img src={cart.image} alt="Wall" />
      </div>
      <div className="item-info-wrapper">
        <div className="item-info">
          <p className="title">{cart.title}</p>
          <p className="price">₹ {cart.price}</p>
          <div className="quantity-selector">
            <span
              className="btn decrement "
              onClick={() => dispatch(removeFromCart(cart))}>
              -
            </span>
            <span className="quantity ">{cart.quantity}</span>
            <span
              className="btn increment "
              onClick={() => dispatch(addToCart(cart))}>
              +
            </span>
          </div>
          <p className="total-price">Subtotal: ₹{cart.quantity * cart.price}</p>
        </div>
      </div>
      <div
        className="item-remove"
        onClick={() => dispatch(removeFromCart(cart))}>
        <AiOutlineClose />
      </div>
    </div>
  );
}

export default CartItem;
