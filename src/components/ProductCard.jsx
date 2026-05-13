import "./ProductCard.css";

import { addToCart } from "../services/cartService";

const ProductCard = ({ product }) => {

  const handleAddToCart = async () => {

    try {

      await addToCart(product.id);

      alert("Product Added To Cart");

    } catch (error) {

      console.log(error);

      alert("Please Login First");
    }
  };

  return (

    <div className="product-card">

      <img
        src={product.imageUrl}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="price">
        ₹ {product.price}
      </p>

      <button onClick={handleAddToCart}>
        Add To Cart
      </button>

    </div>
  );
};

export default ProductCard;