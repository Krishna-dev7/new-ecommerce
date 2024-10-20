import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartService from "../app/cartService";
import { useState } from "react";

const Cart = ({cart}) => {
  const handleCheckout = () => {
    // Show toast notification when item is added
    // toast.success("Item added to cart!", {
    //   position: "top-right",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });

    // Placeholder for your functionality to handle adding items to the cart
  };

  const [quantity, setQuantity] = useState(cart.quantity || 0);


  return (
    <div className="bg-transparent p-6 flex flex-col justify-center items-center min-h-fit">
      {/* Cart container */}
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-semibold text-center">Your Cart</h2>

        {/* Cart item */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
          <div className="flex items-center space-x-4">
            <img
              src={cart ? cart.productId.image : "https://via.placeholder.com/60"}
              alt="item"
              className="w-16 h-16 rounded"
            />
            <div>
              <h3 className="font-semibold">{cart?.productId.slug}</h3>
              <p className="text-gray-600">Price: { cart?.productId.price }</p>
              <p className="text-gray-500">Quantity: {quantity}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
         
            <button
               onClick={ async () => {
                  if ((quantity -1) > 0) {
                    const newCart = await cartService.updateCart(cart._id, {quantity:  quantity - 1});
                    setQuantity(newCart.data.quantity);
                    return;
                  }
                
                setQuantity(1);
              } }
             className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300 ease-in-out">
              -
            </button>
            <button
              onClick={ async () => {
                const newCart = await cartService.updateCart(cart._id, {quantity: quantity + 1})
                setQuantity(newCart.data.quantity);
              } }
             className="bg-blue-500 text-white px-3 py-1 rounded-lg shadow hover:bg-blue-600 transition-colors duration-300 ease-in-out">
              +
            </button>
          </div>
        </div>


      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div>
  );
};

export default Cart;    