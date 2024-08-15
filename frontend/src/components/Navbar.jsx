import { useEffect,useState } from "react"
import authService from "../app/authService"
import {assets} from "../assets/assets"
import {Link} from "react-router-dom"

function Navbar() {

  const [active,setActive]=useState("Home")
  let current='cursor-pointer border-b-2 border-b-blue-900 text-blue-900 font-semibold'
  let other='cursor-pointer text-blue-900 font-semibold'

  return (
    <>
    <div className="dropdown">

    </div>
    <div className='w-screen flex justify-between items-center bg-white'>
            <div className='logo ml-4'>
                <img className='w-20 h-20 md:w-28 duration-300' src={assets.logo} alt="" />
            </div>
            <div className='ul-section'>
                <ul className='flex gap-3 md:flex md:gap-4 lg:gap-6 duration-300'>
                    <li onClick={()=>setActive("Home")} className={active==="Home"?current:other}><Link to="/" className="text-[14px] md:text-[18px] duration-300">Home</Link></li>
                    <li onClick={()=>setActive("Cart")} className={active==="Cart"?current:other}><Link to="/cart" className="text-[14px] md:text-[18px] duration-300">Cart</Link></li>
                    <li onClick={()=>setActive("Order")} className={active==="Order"?current:other}><Link to="/order" className="text-[14px] md:text-[18px] duration-300">Order</Link></li>
                    <li onClick={()=>setActive("Contact-us")} className={active==="Contact-us"?current:other}><Link to="/contact" className="text-[14px] md:text-[18px] duration-300">Contact us</Link></li>
                </ul>
            </div>
            <div className='grid gap-2 md:flex md:gap-3 md:mx-3 lg:gap-5 duration-300'>
                <div><Link to="/login"><button onClick={()=>setActive("")} className='btn bg-transparent border-2 text-blue-900  border-blue-900 rounded-3xl px-2 py-1 my-2 text-[12px] md:text-[15px] md:px-4 lg:px-6 duration-300'>Log In</button></Link></div>
                <div><Link to="/register"><button onClick={()=>setActive("")} className='btn bg-transparent border-2 text-blue-900 border-blue-900 rounded-3xl px-1 py-1 text-[12px] my-2 md:text-[15px] md:px-4 lg:px-6 duration-300'>Sign Up</button></Link></div>
            </div>
        </div>
    </>
  )
}

export default Navbar