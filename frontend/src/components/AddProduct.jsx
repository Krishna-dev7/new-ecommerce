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
    <div className="w-full flex flex-col my-10 justify-center items-center" >
      <h1 className="text-3xl mb-6 font-normal">  Add <span className="underline" >Product</span> </h1>
      <form
        className="w-full bg-slate-100 py-10 px-20 grid grid-cols-2 "
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
          type="number"
          label="Enter Price"
          placeholder="enter a price"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="price"
          { ...register("slug", {
            required: true,
            minLength: 4 || "minimum length of 4", 
          }) }
         />

        <Input
          type="file"
          label="Enter an image"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="image"
          { ...register("slug", {
            required: true,
            minLength: 4 || "minimum length of 4", 
          }) }
         />

        <Input
          type="number"
          label="Enter Quantity"
          placeholder="enter qunatity"
          className="px-5 py-2 rounded-lg border border-1 border-black"
          name="quantity"
          { ...register("slug", {
            required: true,
            minLength: 4 || "minimum length of 4", 
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

        <Button className={'w-fit h-fit place-self-center px-5 py-3 col-span-2 '} > Submit </Button>
      </form>
    </div>
  )
}

export default AddProduct;