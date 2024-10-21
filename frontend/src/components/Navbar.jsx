import { useState } from "react";
import authService from "../app/authService.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";
import { ToastContainer, toast } from "react-toastify";
import { FaBars, FaTimes, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Import necessary icons

function Navbar() {
  const authStatus = useSelector((store) => store.auth.status);
  const dispatch = useDispatch();

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu toggle

  let current = "cursor-pointer border-b-2 border-b-blue-900 text-blue-900 font-semibold";
  let other = "cursor-pointer text-blue-900 font-semibold";

  return (
    <>
      <ToastContainer role="success" />
      
      {/* Navbar container */}
      <div className="w-screen px-3 py-4 text-sm font-semibold flex justify-between items-center bg-white">
        
        {/* Logo Section */}
        <div className="logo ml-4">
          <h1 className="font-bold text-2xl md:text-3xl">LOGO.</h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden mr-4">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <FaTimes className="w-6 h-6 text-blue-900" /> : <FaBars className="w-6 h-6 text-blue-900" />}
          </button>
        </div>

        {/* Navigation Links - Hidden on Mobile, Visible on Larger Screens */}
        <div className={`ul-section w-full md:w-auto ${menuOpen ? "block" : "hidden"} md:flex`}>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-center">
            <li onClick={() => setActive("Home")} className={active === "Home" ? current : other}>
              <Link to="/" className="text-[14px] md:text-[14px] duration-300">
                Home
              </Link>
            </li>
            <li onClick={() => setActive("Cart")} className={active === "Cart" ? current : other}>
              <Link to="/cart" className="text-[14px] md:text-[14px] duration-300">
                Cart
              </Link>
            </li>
            <li onClick={() => setActive("Order")} className={active === "Order" ? current : other}>
              <Link to="/order" className="text-[14px] md:text-[14px] duration-300">
                Order
              </Link>
            </li>
            <li onClick={() => setActive("Contact-us")} className={active === "Contact-us" ? current : other}>
              <Link to="/contact" className="text-[14px] md:text-[14px] duration-300">
                Contact us
              </Link>
            </li>
            <li onClick={() => setActive("add-product")} className={active === "add-product" ? current : other}>
              <Link to="/add-product" className="text-[14px] md:text-[14px] duration-300">
                Add Product
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons Section - Show icons only on mobile */}
        <div className={`grid gap-2 mt-3 md:mt-0 md:flex md:gap-3 lg:gap-5 ${menuOpen ? "block" : "hidden"} md:block`}>
          {!authStatus && (
            <>
              <div>
                <Link to="/login">
                  <button
                    onClick={() => setActive("")}
                    className="bg-[#FAEBD7] px-4 py-2 md:px-6 md:py-3 rounded-md shadow-sm border border-black duration-300 flex items-center justify-center"
                  >
                    {/* Show icon on mobile, hide text on mobile */}
                    <FaSignInAlt className="block md:hidden" />
                    {/* Show text only on larger screens */}
                    <span className="hidden md:block">Log In</span>
                  </button>
                </Link>
              </div>
              <div>
                <Link to="/signup">
                  <button
                    onClick={() => setActive("")}
                    className="bg-orange-400 px-4 py-2 md:px-5 md:py-3 rounded-md shadow-sm border border-black duration-300 flex items-center justify-center"
                  >
                    {/* Show icon on mobile, hide text on mobile */}
                    <FaUserPlus className="block md:hidden" />
                    {/* Show text only on larger screens */}
                    <span className="hidden md:block">Sign Up</span>
                  </button>
                </Link>
              </div>
            </>
          )}

          {authStatus && (
            <div className="text-black">
              <button
                className="bg-white px-4 py-2 md:px-5 md:py-3 rounded-md shadow-md border border-black duration-300"
                onClick={async () => {
                  const res = await authService.logout();
                  if (res) {
                    dispatch(logout());
                    toast("Logout done!", {
                      theme: "dark",
                      autoClose: 3000,
                      closeButton: true,
                      closeOnClick: true,
                    });
                  } else {
                    toast("Logout failed", {
                      theme: "light",
                      autoClose: 3000,
                      closeButton: true,
                      closeOnClick: true,
                    });
                  }
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
