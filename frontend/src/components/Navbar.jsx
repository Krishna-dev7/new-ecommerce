import { useEffect,useState } from "react"
import authService from "../app/authService.js"
import {assets} from "../assets/assets"
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/authSlice.js"

function Navbar() {

    const authStatus = useSelector( (store) => store.auth.status );
    const dispatch = useDispatch();


  const [active,setActive]=useState("Home")
  let current='cursor-pointer border-b-2 border-b-blue-900 text-blue-900 font-semibold'
  let other='cursor-pointer text-blue-900 font-semibold'

  return (
    <>
    <div className="dropdown">
        
    </div>
    <div className='w-screen px-3 py-4 text-sm font-semibold flex justify-between items-center bg-white'>
            <div className='logo ml-4'>
                {/* <img className='w-20 h-20 md:w-28 duration-300' src={assets.logo} alt="" /> */}
                <h1 className="font-bold text-2xl" > LOGO. </h1>
            </div>
            <div className='ul-section'>
                <ul className='flex gap-3 md:flex md:gap-4 lg:gap-6 duration-300'>
                    <li onClick={()=>setActive("Home")} className={active==="Home"?current:other}><Link to="/" className="text-[14px] md:text-[14px] duration-300">Home</Link></li>
                    <li onClick={()=>setActive("Cart")} className={active==="Cart"?current:other}><Link to="/cart" className="text-[14px] md:text-[14px] duration-300">Cart</Link></li>
                    <li onClick={()=>setActive("Order")} className={active==="Order"?current:other}><Link to="/order" className="text-[14px] md:text-[14px] duration-300">Order</Link></li>
                    <li onClick={()=>setActive("Contact-us")} className={active==="Contact-us"?current:other}><Link to="/contact" className="text-[14px] md:text-[14px] duration-300">Contact us</Link></li>
                    <li onClick={()=>setActive("add-product")} className={active==="add-product"?current:other}><Link 
                    to="/add-product" className="text-[14px] md:text-[14px] duration-300">Add Product</Link></li>
                </ul>
            </div>
            <div className='grid gap-2 md:flex md:gap-3 md:mx-3 lg:gap-5 duration-300'>
               { !authStatus &&  <>
                <div><Link to="/login"><button onClick={()=>setActive("")} className='bg-[#FAEBD7] px-6 py-3 rounded-md shadow-sm border border-1 border-black'>Log In</button></Link></div>
                <div><Link to="/signup"><button onClick={()=>setActive("")} className='bg-orange-400 px-5 py-3 rounded-md shadow-sm border border-1 border-black'>Sign Up</button></Link></div>  
               </> }

               { authStatus && <div className="text-black">
                    <button
                     className="bg-white px-4 py-2 rounded-md shadow-md border border-1 border-black"
                     onClick={ async () => {
                        const res = await authService.logout();
                        res ? dispatch(logout()) : null;
                    } } >
                        Logout
                    </button>
               </div> }

            </div>
        </div>
    </>
  )
}

export default Navbar