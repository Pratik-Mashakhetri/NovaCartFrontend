import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {

    getCartItems,
    updateCartQuantity,
    removeCartItem

} from "../services/cartService";

const Cart = () => {

    const navigate = useNavigate();

    const [cartItems, setCartItems] =
        useState([]);

    useEffect(() => {

        fetchCartItems();

    }, []);

    const fetchCartItems = async () => {

        try {

            const data =
                await getCartItems();

            setCartItems(data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleQuantityChange = async (

        cartItemId,
        quantity

    ) => {

        if (quantity < 1) {
            return;
        }

        try {

            await updateCartQuantity(
                cartItemId,
                quantity
            );

            fetchCartItems();

        } catch (error) {

            console.log(error);
        }
    };

    const handleRemoveItem = async (
        cartItemId
    ) => {

        try {

            await removeCartItem(cartItemId);

            fetchCartItems();

        } catch (error) {

            console.log(error);
        }
    };

    const totalAmount =
        cartItems.reduce(

            (total, item) =>
                total + item.totalPrice,

            0
        );

    return (

        <div className="cart-page">

            <h1>My Cart</h1>

            {

                cartItems.length === 0 ? (

                    <p>Cart Is Empty</p>

                ) : (

                    <div>

                        {

                            cartItems.map((item) => (

                                <div
                                    key={item.id}
                                    className="cart-item"
                                >

                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        width="120"
                                    />

                                    <div>

                                        <h2>
                                            {item.product.name}
                                        </h2>

                                        <p>
                                            ₹ {item.product.price}
                                        </p>

                                        <div>

                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                -
                                            </button>

                                            <span>
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <h3>
                                            Total:
                                            ₹ {item.totalPrice}
                                        </h3>

                                        <button
                                            onClick={() =>
                                                handleRemoveItem(item.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            ))
                        }

                        <hr />

                        <h2>
                            Grand Total:
                            ₹ {totalAmount}
                        </h2>

                        <button
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed To Checkout
                        </button>

                    </div>
                )
            }

        </div>
    );
};

export default Cart;