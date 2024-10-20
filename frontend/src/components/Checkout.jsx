import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import orderService from "../app/orderService.js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cartService from "../app/cartService.js";

const Checkout = () => {

  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect( () => {
    cartService.getCarts()
      .then(res => {
        setCarts(res.data)
      })
      .catch(err => console.log(err.message));
  }, [setCarts] )

  const handleOrderPlaced = async () => {
    const res = await orderService.createOrder();
    console.log(res)
    if (res) {
      toast.success("Your order has been placed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    toast.error("Your order hasn't been placed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Toast notification for order placement
  };

  useEffect(() => {
    
    if (carts.length) {
      let total = 0;
      carts.forEach( cart => {
        total += Math.floor(cart.quantity * cart.productId.price);
      })

      setTotal(total);
    }
  }, [carts])

  
  return (
    <div className="min-h-screen w-screen flex justify-center items-center bg-cover bg-fixed bg-center" 
      style={{ backgroundImage: "url('https://www.publicdomainpictures.net/pictures/40000/nahled/antique-paper-background-1364202662X4p.jpg')" }}>
      
      <div className="max-w-5xl w-full bg-white/90 rounded-lg p-10 shadow-2xl animate__animated animate__zoomIn">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">Order Summary</h1>
          <p className="text-xl text-gray-700">Thank you for shopping with us!</p>
        </div>

        {/* Order Items */}
        <div className="mt-8 space-y-6">
          { (carts.length > 0) && carts.map( cart => {
            
            return <div
              key={cart._id}
             className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <img src={cart.productId.image} className="w-32 h-32 rounded-full" alt="" />
            <div>
              <h3 className="text-lg font-semibold">{cart.productId.slug}</h3>
              <p className="text-gray-600">Quantity: {cart.quantity}</p>
            </div>
            <p className="text-lg font-semibold">${Math.floor(cart.productId.price * cart.quantity)}</p>
          </div>
          }) }
          {/* <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div>
              <h3 className="text-lg font-semibold">Product 2</h3>
              <p className="text-gray-600">Quantity: 1</p>
            </div>
            <p className="text-lg font-semibold">$20.00</p>
          </div> */}
        </div>

        {/* Total */}
        <div className="mt-10 bg-gray-200 p-6 rounded-lg shadow-md text-right text-2xl font-bold">
          <span>Total: ${total}</span>
        </div>

        {/* Place Order Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleOrderPlaced}
            className="flex items-center bg-green-600 text-white px-6 py-3 rounded-full shadow-lg text-xl transition-transform transform hover:scale-110 hover:bg-green-700 duration-300 ease-in-out"
          >
            <FaCheckCircle className="mr-2" />
            Place Order
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default Checkout;
