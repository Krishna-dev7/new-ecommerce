import React, { useEffect, useState } from 'react'
import CartItem from '../components/Cart'
import cartService from '../app/cartService';
import { Link } from 'react-router-dom';

function Cart() {

  const [carts, setCarts] = useState([]);

  useEffect( () => {
    cartService.getCarts()
      .then (result => {
        setCarts(result.data);
      })
  }, [] )

  return (
    <div className='w-screen'>
      {
        carts.length > 0 ? carts.map( cart => {
          return <CartItem cart={cart}/>
        }) : <div>
                <div class="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
              <div class="flex flex-col items-center">
                  <svg class="w-16 h-16 text-gray-400 mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l1.68 9.39a1 1 0 0 0 1 .87h9.72a1 1 0 0 0 1-.87L23 6H6"></path>
                  </svg>
                  <h1 class="text-xl font-semibold text-gray-700 mb-2">No items found in the cart</h1>
                  <p class="text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                  <a href="/shop" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Continue Shopping</a>
              </div>
          </div>
        </div>
      }

      {carts.length && <div className="flex justify-center">
          <Link to={`/Checkout`}>
            <button
              
              className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-transform duration-500 ease-in-out transform hover:scale-105"
            >
              Checkout
            </button>
          </Link>
        </div>}
    </div>
  )
}

export default Cart
