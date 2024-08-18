import React from 'react'
import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <>
      <div className={`bg-white gap-y-4 p-4 grid justify-center w-screen justify-items-center items-center md:flex md:items-center lg:justify-around`}>
        <div className='logo'>
          <img className='animate-pulse ' src={assets.namaste_icon} alt="" />
        </div>
        <div className='ul-section'>
          <ul className='grid grid-cols-2 gap-7 justify-center justify-items-center md:flex mx-6 md:gap-3 lg:gap-10'>
            <div className='cursor-pointer text-blue-900 font-semibold'>Privacy Policy</div>
            <div className='cursor-pointer text-blue-900 font-semibold'>Term of Service</div>
            <div className='cursor-pointer text-blue-900 font-semibold'>Return Policy</div>
            <div className='cursor-pointer text-blue-900 font-semibold'><Link to='/contact'>Contact Us</Link></div>
          </ul>
        </div>
        <div className='footer-right flex  justify-center gap-7   justify-items-center md:gap-4 md:ml-2'>
          <div>
            <img className='size-10 cursor-pointer' src={assets.fb_icon} alt="" />
          </div>
          <div>
            <img className='size-10 cursor-pointer' src={assets.twit_icon} alt="" />
          </div>
          <div>
            <img className='size-10 cursor-pointer' src={assets.insta_icon} alt="" />
          </div>
        </div>
      </div>

    </>
  )
}

export default Footer
