import axios from "axios";

class Order {
    url = "/api/orders"

    async createOrder(){
        try {
            const res = await axios.post(`${this.url}/`);
            console.log(res);
            return res ?? false;

        } catch (error) {
            console.log(error.message);
        }
    }


    async getOrders() {
        try {
            const res = await axios.get(`${this.url}/`);
            console.log(res);
            return res ?? false;
        } catch (error) {
            console.log(error.message);
        }
    }
}


const orderService = new Order();
export default orderService;