import Cart from "../models/cart.model.js";

export async function listCartItems(req, res) {
  const userId = req.user._id;
  if (userId) {
    const cartItems = await Cart.find({ userId });
    return res.json(cartItems);
  }
  res.json(false);
}

export async function getCartItem(req, res) {
  const id = req.params;
  if (id) {
    const cartItem = await Cart.findById(id).populate('userId');
    return res.json(cartItem)
  }
  res.json(false);
}

export async function createCart(req, res) {
  const { productId, userId, quantity } = req.body;
  if(req.body) {
    const cart = await Cart.create({productId, userId, quantity })
    return res.json(cart);
  }
  res.json(false);
}

export async function updateCart(req, res) {
  const {id} = req.params;
  const { quantity } = req.body;
  if(id && quantity) {
    const cart = await Cart.findByIdAndUpdate(id, {quantity}, {new: true});
    return res.json(cart);
  }
  res.json(false);
}

export async function deleteCart(req, res) {
  const {id} = req.params;
  if(id) {
    const cart = await Cart.findByIdAndDelete(id, {new: true});
    return res.json(cart);
  }
  res.json(false);
}
