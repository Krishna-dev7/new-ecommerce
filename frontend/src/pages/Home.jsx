import productService from "../app/productService.js";
import { useEffect, useState } from "react";
import Product from "../components/Product.jsx";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getProducts()
      .then(response => {
        console.log(response);
        setProducts(response);
      });
  }, [setProducts]);

  return (
    <>  
      <div className="mt-5 gap-4 rounded-md h-fit w-screen items-center flex flex-col justify-center text-white">
        {products?.length > 0 ? products.map(p => (
          <Product key={p._id} className="flex justify-center items-center border-2 text-orange-600 rounded w-full md:w-4/5 lg:w-1/3 z-20">
            <Link to={`/ProductDetail/${p._id}`} >
              <div className="flex flex-col items-center w-full text-center text-sm p-4">
                <img
                  src={p.image}
                  alt=""
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 scale-90 rounded-full object-cover px-2 py-2"
                />
                <p className="capitalize font-semibold text-lg md:text-xl"> {p.slug} </p>
                <p className="capitalize text-sm md:text-base"> {p.description} </p>
                <p className="capitalize font-bold text-purple-800 text-sm md:text-lg"> ${p.price} </p>
              </div>
            </Link>
          </Product>
        )) : (
          <div className="text-black bg-[rgb(251,243,203)] w-full h-screen flex flex-col justify-center items-center">
            <p>
              <img
                className="w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 object-center"
                src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"
                alt=""
              />
            </p>
            <p className="mt-4 text-lg">No products available</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
