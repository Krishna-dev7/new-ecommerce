import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import APIResponse from "../utils/APIResponse.js";

export async function createOrder(req, res, next) {
    if (req.user) {
        const userId = req.user._id;
        const carts = await Cart.find({userId});
        if (carts) {
            const order = Order.create({
                userId,
                products: carts,
                shipmentTime: new Date(),
            });
            
            return order
                 ? res.json(new APIResponse(200, "created", order))
                 : res.json(false);
        }

        return res.json(new APIResponse(200, "no carts found"));
    }
}

export async function listOrders(req, res) {
    if(req.user) {
        const userId = req.user._id;
        const orders = await Order.find({userId}, {new: true}).populate([
            {
                path: "products",
                populate: {
                    path: "productId",
                    model: "Product"
                }
            },
            {
                path: '_id',
                model: 'Order'
            }
        ]);
        return res.json(orders);
    }
    return false;
}

export async function updateOrder(req, res) {
    const {id:orderId} = req.params;
    console.log(id);
    if (orderId) {
        const result = await Order.findByIdAndUpdate(orderId, {status: "delivered"}, {new: true});
        return res.json(result);
    }
    return false;
}


export async function cancelOrder(req, res) {
    if(req.user) {
        const userId = req.user._id;
        const allOrders = await Order.findOneAndDelete({userId}, {new: true});
        if (allOrders) {
            return res.json(new APIResponse(200, "order cancelled", allOrders));
        }
        return res.json(false);
    }
}