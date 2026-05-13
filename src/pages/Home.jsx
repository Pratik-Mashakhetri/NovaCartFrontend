import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  getAllProducts
} from "../services/productService";

import {
  addToCart
} from "../services/cartService";

const Home = () => {

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const data =
        await getAllProducts();

      setProducts(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleAddToCart = async (
    productId
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert("Please Login First");

        navigate("/login");

        return;
      }

      await addToCart(productId);

      alert("Product Added To Cart");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="home-container">

      <div className="navbar">

        <h2>NovaCart</h2>

        <button
          onClick={() =>
            navigate("/cart")
          }
        >
          Cart
        </button>

      </div>

      <h1>All Products</h1>

      <div className="products-grid">

        {

          products.map((product) => (

            <div
              key={product.id}
              className="product-card"
            >

              <img
                src={product.imageUrl}
                alt={product.name}
              />

              <h3>
                {product.name}
              </h3>

              <p>
                {product.description}
              </p>

              <h2>
                ₹ {product.price}
              </h2>

              <button
                onClick={() =>
                  handleAddToCart(product.id)
                }
              >
                Add To Cart
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
};

export default Home;