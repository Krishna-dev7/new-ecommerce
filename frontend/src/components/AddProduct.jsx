import Input from "./Input";
import Button from "./Button";
import Textarea from "./Textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";

function AddProduct() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  async function addProductOnSubmit(data) {
    
  }

  return (
    <div className="w-full bg-purple-200 shadow-lg border border-1 border-black py-10 rounded-lg flex flex-col my-10 justify-center items-center" >
      <h1 className="text-3xl mb-6 font-normal">  Add <span className="underline" >Product</span> </h1>
      <form
        className="w-full py-10 px-20 grid grid-cols-2 "
         onSubmit={handleSubmit}>
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
          { ...register("slug", {
            required: true,
            minLength: 4 || "minimum length of 4",
            }) }
          />
        </div>

        <Button className={'w-fit h-fit place-self-center px-5 py-3 col-span-2 bg-white border border-1 border-black shadow-md'} > Submit </Button>
      </form>
    </div>
  )
}

export default AddProduct;