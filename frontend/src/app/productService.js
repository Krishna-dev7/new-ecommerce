import axios from "axios";
import conf from "../conf/conf.js";
axios.defaults.baseURL=conf.hosturl;
axios.defaults.withCredentials=true;
token = localStorage.getItem("accessToken");
token &&( axios.defaults.headers.common['Authorization'] = `${token}`);
class Product {
  url = "/api/products";

  async getProducts() {
    try {
      const allProducts = await axios.get(`${this.url}/`);
      console.log("all products: ", allProducts);
      if (allProducts.data.length > 0) {
        return allProducts.data;
      }
      return false;
    } catch (error) {
      console.log("product service error: ", error.message);
    }
  }

  async getProduct(productId) {
    try {
      const product = await axios.get(`${this.url}/${productId}`);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }

  async createProduct({
    slug,
    description,
    price,
    quantity,
    image,
  }) {
    try {
      const product = await axios.post(`${this.url}/`, {
        slug, description, price,  quantity, image
       });
      return product;
    } catch (error) {
      console.log(error.message);
    }    
  }

  async updateProduct(id, { 
    slug,
    description,
    price,
    quantity,
    image,
  }) {
    try {
      const product = await axios.put(`${this.url}/${id}`, {
        slug, description,  price,  quantity, image
      });
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const product = await axios.delete(`${this.url}/${id}`);
      return product;
    } catch (error) {
      console.log(error.message);
    }
  }
}

const productService = new Product();
export default productService;
