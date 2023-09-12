import React, { useEffect, useState } from "react";
import "./ProductDetails..scss";
import { useParams } from "react-router";
import { axiosClient } from "../../utils/axiosClient";
import Loader from "../../components/Loader/Loader";
import { addToCart, removeFromCart } from "../../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const cart = useSelector((state) => state.cartReducer.cart);

  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  const fetchData = async () => {
    const productResponse = await axiosClient.get(
      `/porducts?filters[key][$eq]=${params.productId}&populate=*`
    );
    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  };

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img ">
            <img
              src={product?.attributes.image.data.attributes.url}
              alt="Product Poster"
            />
          </div>
          <div className="product-info">
            <h1 className="heading">{product?.attributes.title}</h1>
            <h3 className="price">₹{product?.attributes.price}</h3>
            <p className="discription">{product?.attributes.desc}</p>
            <div className="cart-option">
              <div className="quantity-selector">
                <span
                  className="btn decrement "
                  onClick={() => dispatch(removeFromCart(product))}>
                  -
                </span>
                <span className="quantity ">{quantity}</span>
                <span
                  className="btn increment "
                  onClick={() => dispatch(addToCart(product))}>
                  +
                </span>
              </div>

              <button
                className="CartBtn add-to-cart"
                onClick={() => dispatch(addToCart(product))}>
                <span className="IconContainer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 576 512"
                    fill="rgb(17, 17, 17)"
                    className="cart">
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                  </svg>
                </span>
                <p className="text">Add to Cart</p>
              </button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  We offer a 30-day money-back guarantee from the date of
                  delivery. If you are not satisfied with your "LuminaGlow LED
                  Canvas" within this period.
                </li>
                <li>
                  In the rare event that your "LuminaGlow LED Canvas" arrives
                  damaged or defective, we apologize for any inconvenience
                  caused.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
