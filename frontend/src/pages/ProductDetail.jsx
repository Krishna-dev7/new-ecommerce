import productService from "../app/productService";
import { useParams } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaShoppingCart, FaCreditCard } from "react-icons/fa";
import cartService from "../app/cartService";
import { useSelector } from "react-redux";

function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const {userId} = useSelector( store => store.auth);
    console.log("userid: ",userId)
    useEffect( () => {
        productService.getProduct(id)
            .then( result => {
                console.log(result.data);
                setProduct(result.data);
            })
            .catch( err => {
                console.log(err.message);
            })
    }, [] )


    const handleAddToCart = async () => {

        const res = await cartService.createCart({
            productId: product._id,
            userId: userId,
            quantity: 1
        })
        // Show toast notification when item is added to cart
        res && toast.success("Item added to cart!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
      };


      
  const handleCheckout = () => {
    // Show toast notification for checkout
    toast.info("Proceeding to checkout!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


    return <div>
        { product &&  <div className="bg-gray-100 min-h-screen w-screen p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 md:flex md:space-x-8 animate__animated animate__fadeIn">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt="Product"
            className="rounded-lg w-full h-auto transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-semibold">{product.$id}</h1>
          <p className="text-gray-700 text-xl">{product.price}</p>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-gray-600">{(product.quantity ? "in Stock" : "out of stock")}<span className="font-bold"> {product.quantity}</span></p>

          {/* Add to Cart and Checkout Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-blue-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={handleCheckout}
              className="flex items-center bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <FaCreditCard className="mr-2" />
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer />
    </div> }
    </div>
}

export default ProductDetail;