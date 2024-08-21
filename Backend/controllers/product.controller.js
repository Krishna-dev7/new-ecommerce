import Product from "../models/product.model.js";

export async function listProducts(_, res) {
  const allProducts = await Product.find();
  if (allProducts.length > 0) {
    return res.json(allProducts);
  }
  res.json([]);

}

export async function getProduct(req , res) {
  const {productId} = req.params;
  const  product = await Product.findById(productId);
  if (product) {
    res.json(product);
  }
  res.json({});
}

export async function createProduct(req, res) {
  try {
    const {
      slug,
      description,
      price,
      quantity=1,
      userId
    } = req.body;
    const product = await Product.create({
      slug,
      description,
      price,
      quantity,
      userId
    });
  
    console.log(product);
    if (product) {
      return res.json(product);
    }
  
    res.json(false);
  } catch (error) {
    console.log(error.message);
    res.json(false);
  }
}

export async function updateProduct(req, res) {

  const { id } = req.params;
  const { slug, description, price, quantity } = req.body;
  if (id) {
    const result = await Product.findByIdAndUpdate(productId, {
      slug,
      description,
      price,
      quantity
    }, { new: true });

    console.log("updated result: ", result)
    return res.json(result);
  }
  res.json(false);
  
}

export async function deleteProduct(req, res) {
  const {id} = req.params;
  if (id) {
    const result = await Product.findByIdAndDelete(id, {new: true});
    console.log(result)
    return res.json(result);
  }

  res.json(false);
}