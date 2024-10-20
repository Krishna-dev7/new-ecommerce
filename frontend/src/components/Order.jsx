import { useEffect, useState } from "react";
import { FaCheckCircle, FaShippingFast, FaBoxOpen } from "react-icons/fa";
import orderService from "../app/orderService";

const Order = () => {
  // Mock order data
  // const orders = [
  //   {
  //     id: "ORD12345",
  //     date: "Oct 19, 2024",
  //     total: "$120.00",
  //     status: "Shipped",
  //     products: [
  //       { name: "Product 1", qty: 2, price: "$40.00" },
  //       { name: "Product 2", qty: 1, price: "$40.00" }
  //     ]
  //   },
  //   {
  //     id: "ORD67890",
  //     date: "Oct 18, 2024",
  //     total: "$60.00",
  //     status: "Delivered",
  //     products: [
  //       { name: "Product 3", qty: 1, price: "$60.00" }
  //     ]
  //   }
  // ];

  const [orders, setOrders] = useState(null);

  useEffect( () => {
    orderService.getOrders()
      .then(res =>{
        setOrders(res.data)
      })
      .catch(err => console.log(err.message));
  }, [] )
  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-8 animate__animated animate__fadeIn">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Placed Orders</h1>
          <p className="text-gray-600">Your recent orders are displayed below</p>
        </div>

        {/* Order List */}
        {orders && orders.map((order) => (
          <div
            key={order._id._id}
            className="bg-gray-50 rounded-lg p-6 shadow-md space-y-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
          >
            {/* Order Info */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Order ID: {order._id._id}</h2>
                <p className="text-gray-500">Date: { new Date(order._id.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-800">Total: ${order.products.reduce( (acc, product) => (acc + Math.floor(product.productId.price * product.quantity)), 0)}</p>
                <p className={`text-lg font-bold ${
                    order._id.status === "Delivered" ? "text-green-500" : "text-blue-500"
                  }`}
                >
                  {order._id.status === "Delivered" ? (
                    <FaCheckCircle className="inline-block mr-2" />
                  ) : (
                    <FaShippingFast className="inline-block mr-2" />
                  )}
                  {order._id.status}
                </p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-2">
              {order.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-white p-4 rounded-lg shadow-inner"
                >
                  <div className="text-gray-800">
                    <p className="font-semibold">{product.productId.slug}</p>
                    <p className="text-gray-500">Quantity: {product.quantity}</p>
                  </div>
                  <p className="text-gray-600">${Math.floor(product.productId.price * product.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
