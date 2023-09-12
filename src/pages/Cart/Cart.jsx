import React from "react";
import "./Cart.scss";
import { AiOutlineClose } from "react-icons/ai";
import CartItem from "../../components/Cart Item/CartItem";
import { useSelector } from "react-redux";
import { BsCartX } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { axiosClient } from "../../utils/axiosClient";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function Cart({ onClose }) {
  const cart = useSelector((state) => state.cartReducer.cart);
  let totalAmount = 0;
  cart.forEach((item) => (totalAmount += item.quantity * item.price));
  const isCartEmpty = cart.length === 0;

  async function handleCheckout() {
    try {
      const response = await axiosClient.post("/orders", {
        products: cart,
      });

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({
        sessionId: response.data.stripeId,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose />
            Close
          </div>
        </div>
        {cart.map((item, id) => (
          <CartItem key={id} cart={item} />
        ))}
        {isCartEmpty && (
          <div className="empty-cart-info">
            <div className="icon">
              <BsCartX />
            </div>
            <h4>Cart is Empty</h4>
          </div>
        )}
        {!isCartEmpty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total:</h3>
              <h3 className="total-value">₹ {totalAmount}</h3>
            </div>
            <div className="checkout Btn" onClick={handleCheckout}>
              Pay
              <svg className="svgIcon" viewBox="0 0 576 512">
                <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
