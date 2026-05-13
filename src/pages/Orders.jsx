import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../services/orderService";
import "./Orders.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const data = await getMyOrders();

      setOrders(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleCancel = async (orderId) => {

    try {

      await cancelOrder(orderId);

      fetchOrders();

    } catch (error) {

      console.log(error);
    }
  };

  return (
    <div className="orders-container">

      <h2>My Orders</h2>

      {
        orders.length === 0 ? (

          <p>No Orders Found</p>

        ) : (

          orders.map((order) => (

            <div
              key={order.id}
              className="order-card"
            >

              <h3>Order #{order.id}</h3>

              <p>
                Status:
                <span className="status">
                  {order.status}
                </span>
              </p>

              <p>
                Total:
                ₹{order.totalAmount}
              </p>

              <p>
                Date:
                {" "}
                {new Date(order.orderDate)
                  .toLocaleString()}
              </p>

              <div className="order-items">

                {
                  order.orderItems.map((item) => (

                    <div
                      key={item.id}
                      className="order-item"
                    >

                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />

                      <div>

                        <h4>{item.product.name}</h4>

                        <p>
                          Quantity:
                          {" "}
                          {item.quantity}
                        </p>

                        <p>
                          Price:
                          ₹{item.price}
                        </p>

                      </div>

                    </div>
                  ))
                }

              </div>

              {
                order.status !== "CANCELLED" && (

                  <button
                    className="cancel-btn"
                    onClick={() =>
                      handleCancel(order.id)
                    }
                  >
                    Cancel Order
                  </button>
                )
              }

            </div>
          ))
        )
      }

    </div>
  );
};

export default Orders;