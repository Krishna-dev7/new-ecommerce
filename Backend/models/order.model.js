import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }, 
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shipmentTime: {
        type: Schema.Types.Date,
        required: true
    },
    status: {
        type: String,
        enum: ["shipped", "delivered"],
        default: 'shipped'
    }
}, {timestamps: true});

const Product = mongoose.model('Order', orderSchema);
export default Product;