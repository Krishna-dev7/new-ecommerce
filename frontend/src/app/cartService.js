import axios from "axios";
import conf from "../conf/conf.js";
axios.defaults.baseURL=conf.hosturl;
axios.defaults.withCredentials=true;
const token = localStorage.getItem("accessToken");
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
class Cart {
  url = "/api/carts";

  async getCart(id){
    try {
      const cart = await axios.get(`${this.url}${id}`);
      return cart
    } catch (error) {
      console.log(error.message);
    }
  }

  async getCarts(){
    try {
      const carts = await axios.get(`${this.url}/`);
      return carts
    } catch (error) {
      console.log(error.message);
      
    }
  }

  async createCart({
    productId, userId, quantity
  }) {
    try {
      const cart = await axios.post(`${this.url}/`, {
        productId, userId, quantity
      })
      return cart;
    } catch (error) {
      console.log(error.message);
    }
  }

  async updateCart(id, {
    quantity
  }) {
    try {
      const cart = await  axios.put(`${this.url}/${id}`, {quantity})
      return cart;
    } catch (error) {
      console.log(error.message);
      
    }
  }

  async deleteCart(id) {
    try {
      const  cart = await axios.delete(`${this.url}/${id}`)
      return cart;
    } catch (error) {
      console.log(error.message);
      
    }
  }

}


const cartService = new Cart();
export default cartService;