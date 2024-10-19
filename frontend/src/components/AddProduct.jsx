import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import productService from "../app/productService";
import cloudService from "../app/cloudService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  async function addProductOnSubmit(data) {
    const fileId = data.image[0] ? await cloudService.uploadFile(data.image[0]) : null;
    const image = await cloudService.getFilePreview(fileId.$id);
    if (image) {
      productService.createProduct({...data, image})
      .then(res => toast("product added successfully", {
        autoClose: 3000,
        closeOnClick: true,
        closeButton: true
      }))
      .catch(err => setError(err))
    } else {
      console.log("fileid is null");
    }
  } 

  return (
    <div className="w-full bg-purple-200 shadow-lg border border-1 border-black py-10 rounded-lg flex flex-col my-10 justify-center items-center" >
      <ToastContainer />
      <h1 className="text-3xl mb-6 font-normal">  Add <span className="underline" >Product</span> </h1>
      <form
        className="w-full py-10 px-20 grid grid-cols-2 "
         onSubmit={handleSubmit(addProductOnSubmit)}>
        <Input
          type="text"
          label="Enter a slug"
          placeholder="enter a slug"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="slug"
          { ...register("slug", {
            required: true,
            minLength: 4 || "minimum length of 4", 
          }) }
         />

        <Input
          type="text"
          label="Enter Price"
          placeholder="enter a price"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="price"
          { ...register("price", {
            required: true,
            min:  0 || "minimum price of 0",  
          }) }
         />

        <Input
          type="file"
          label="Enter an image"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="image"
          { ...register("image", {
            required: true,
          }) }
         />

        <Input
          type="text"
          label="Enter Quantity"
          placeholder="enter qunatity"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="quantity"
          { ...register("quantity", {
            required: true,
            min: 4 || "minimum quantity of 4", 
          }) }
         />

        <div className="w-full col-span-2" >
          <Textarea
          label="Enter Description"
          placeholder="enter description"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="description"
          { ...register("description", {
            required: true,
            minLength: 4 || "minimum length of 4",
            }) }
          />
        </div>

        <Button type="submit" className={'w-fit h-fit place-self-center px-5 py-3 col-span-2 bg-white border border-1 border-black shadow-md'} > Submit </Button>
      </form>
    </div>
  )
}

export default AddProduct;