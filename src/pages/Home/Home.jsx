import React, { useEffect, useState } from "react";
import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import Product from "../../components/Product/Product";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";

function Home() {
  const [topProduct, setTopProduct] = useState(null);
  const categories = useSelector((state) => state.categoryReducer.categories);

  const fetchData = async () => {

    const topProductResponse = await axiosClient.get(
      "/porducts?filters[isTopPick][$eq]=true&populate=image"
    );
    setTopProduct(topProductResponse.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading center">Shop By Categories</h2>
          <p className="subheading center">
            Shop from the Best, Our Film and Tv Posters Collection.{" "}
          </p>
        </div>
        <div className="content">
          {categories?.map((category) => (
            <Category key={category?.id} category={category} />
          ))}
        </div>
      </section>

      <section className="collection container">
        <div className="info">
          <h2 className="heading center">Our Top Picks</h2>
          <p className="subheading center">All New Design, Same Old Details.</p>
        </div>
        <div className="content">
          {topProduct?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
