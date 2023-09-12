import React, { useEffect, useRef, useState } from "react";
import "./Payments.css";
import { useNavigate, useParams } from "react-router";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { resetCart } from "../../redux/Slices/cartSlice";

function Payments() {
  const params = useParams();
  const status = params.status;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const orderButtonRef = useRef(null);

  const handleOrderButtonClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 10000);
    }
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(resetCart());
      if (orderButtonRef.current) {
        orderButtonRef.current.click();
      }
    }
  }, [status, dispatch]);

  const infoData = {
    success: {
      message: "",
      cta: "Shop More",
      icon: <BsFillCartCheckFill />,
    },
    failed: {
      message: "Payment failed",
      cta: "Try Again",
      icon: <BiErrorCircle />,
    },
  };

  if (status === "success") {
    dispatch(resetCart());
  }

  console.log("state", status);

  return (
    <div className="Payments">
      <div className="iconss">{infoData[status].icon}</div>
      <h2 className="message">{infoData[status].message}</h2>
      {status === "failed" ? ( // Conditionally render Payment Failed button
        <button className="button" type="button" onClick={() => navigate("/")}>
          <svg
            viewBox="0 0 16 16"
            className="bi bi-arrow-repeat"
            fill="currentColor"
            height="16"
            width="16"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
            <path
              d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              fill-rule="evenodd"></path>
          </svg>
          {infoData[status].cta}
        </button>
      ) : (
        <button
          ref={orderButtonRef}
          className={`order ${isAnimating ? "animate" : ""}`}
          onClick={handleOrderButtonClick}>
          <span className="default">Complete Order</span>
          <span className="success">
            Order Ongoing
            <svg viewbox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
            </svg>
          </span>
          <div className="box"></div>
          <div className="truck">
            <div className="back"></div>
            <div className="front">
              <div className="window"></div>
            </div>
            <div className="light top"></div>
            <div className="light bottom"></div>
          </div>
          <div className="lines"></div>
        </button>
      )}
    </div>
  );
}

export default Payments;
