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
      productService.createProduct({ ...data, image })
        .then(res => toast("Product added successfully", {
          autoClose: 3000,
          closeOnClick: true,
          closeButton: true
        }))
        .catch(err => setError(err));
    } else {
      console.log("File ID is null");
    }
  }

  return (
    <div className="w-full bg-purple-200 shadow-lg border border-1 border-black py-10 rounded-lg flex flex-col my-10 justify-center items-center">
      <ToastContainer />
      <h1 className="text-3xl mb-6 font-normal">Add <span className="underline">Product</span></h1>
      <form
        className="w-full max-w-lg px-4 sm:px-8 md:px-12 lg:px-20 grid grid-cols-1 gap-6"
        onSubmit={handleSubmit(addProductOnSubmit)}
      >
        <Input
          type="text"
          label="Enter a slug"
          placeholder="Enter a slug"
          className="px-5 py-2 rounded-lg border border-gray-300"
          name="slug"
          {...register("slug", {
            required: true,
            minLength: 4 || "Minimum length of 4",
          })}
        />

        <Input
          type="number"
          label="Enter Price"
          placeholder="Enter a price"
          className="px-5 py-2 rounded-lg border border-gray-300"
          name="price"
          {...register("price", {
            required: true,
            min: 0 || "Minimum price of 0",
          })}
        />

        <Input
          type="file"
          label="Upload an Image"
          className="px-5 py-2 rounded-lg border border-gray-300"
          name="image"
          {...register("image", {
            required: true,
          })}
        />

        <Input
          type="number"
          label="Enter Quantity"
          placeholder="Enter quantity"
          className="px-5 py-2 rounded-lg border border-gray-300"
          name="quantity"
          {...register("quantity", {
            required: true,
            min: 1 || "Minimum quantity of 1",
          })}
        />

        <div className="w-full col-span-1">
          <Textarea
            label="Enter Description"
            placeholder="Enter description"
            className="px-5 py-2 rounded-lg border border-gray-300"
            name="description"
            {...register("description", {
              required: true,
              minLength: 4 || "Minimum length of 4",
            })}
          />
        </div>

        <Button type="submit" className={'w-full h-fit place-self-center px-5 py-3 col-span-1 bg-white border border-gray-300 shadow-md hover:bg-gray-100'}>Submit</Button>
      </form>
    </div>
  );
}

export default AddProduct;
