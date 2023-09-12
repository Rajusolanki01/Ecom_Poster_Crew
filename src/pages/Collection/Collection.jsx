import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../components/Product/Product";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";

function Collection() {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([]);
  const categories = useSelector((state) => state.categoryReducer.categories);

  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest first",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  const fetchproducts = async () => {
    const url = params.categoryId
      ? `/porducts?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/porducts?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  };

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchproducts();
  }, [params,sortBy]);

  const updatecategory = (e) => {
    navigate(`/category/${e.target.value}`);
  };

  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore All Print and Artwork</h2>
            <p>
              India'a largest collection of wall posters for your bedroom,
              living room, kids room, kitchen and posters & art prints at
              highest quality and lowest price guaranteed.
            </p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <p
                style={{
                  color: "black",
                  fontWeight: "700",
                  fontSize: "1.2rem",
                }}
                className="sort-by-text">
                Sort By
              </p>
              <select
                className="select-sort-by"
                name="sort-by"
                id="sort-by"
                onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories.map((item) => (
                <div key={item.id} className="filter-radio">
                  <input
                    name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    onChange={updatecategory}
                    checked={item.attributes.key === categoryId}
                  />
                  <label htmlFor={item.id}>{item.attributes.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="products-box">
            {products.map((product,id) => (
              <Product key={id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;
