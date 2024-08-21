import Navbar from "../components/Navbar";
import Signup from "./Signup";
import productService from "../app/productService.js";
import { useEffect, useState } from "react";
import Product from "../components/Product.jsx";
import { assets } from "../assets/assets.js";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect( () => {
    productService.getProducts()
    .then(response => {
      console.log(response);
      setProducts(response);
    })
  }, [setProducts] )

  return (
    <>  
      <div className=" mt-15 gap-10 rounded-md h-fit w-full items-center flex flex-col justify-center text-white">

        { products?.length > 0 ? products.map( p => {
          return <Product key={p._id} className="flex justify-center items-center border-2 rounded w-2/3 z-20">
            <div className="flex flex-col items-center w-full text-center text-sm ">
            <img src={p.image} alt="" className="w-60 h-60 scale-90 rounded-full px-2 py-2"/>
            <p className="capitalize font-semibold text-lg"> {p.slug} </p>
            <p className="capitalize"> {p.description} </p>
            <p className="capitalize font-bold text-purple-800"> { p.price } </p>
            </div>
           
          </Product>} ) : <div className="text-black bg-[rgb(251,243,203)] w-screen flex justify-center h-screen items-center" >
            <p>
              <img 
                className="w-60 -mt-40 h-60 object-center"
               src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif" alt="" />
            </p>
            { products.length }
          </div>
          }
      </div>
    </>
  )
}

export default Home;