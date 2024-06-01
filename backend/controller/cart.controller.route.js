const mongoose = require('mongoose');
const Cart = require('../models/cartModel.js');
const Product = require('../models/ProductModel.js');



// creates a new cart or returns existing based on userId ---confirmed -to be used
///create_getcart/:userId
// const addCreateCart = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const existingCart = await Cart.findOne({userId});

//     if (existingCart) {
//       return res.status(200).json(existingCart);
//     }

//     const cart = new Cart({ userId, date: new Date().toISOString(), products: [] });
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


const addCreateCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find existing cart for the user
    let existingCart = await Cart.findOne({ userId }).populate('products.productId');

    // If the cart exists, return it
    if (existingCart) {
      return res.status(200).json(existingCart);
    }

    // If no cart exists, create a new one
    const cart = new Cart({ userId, date: new Date().toISOString(), products: [] });
    await cart.save();
    
    // Populate the products in the cart
    const populatedCart = await Cart.findById(cart._id).populate('products.productId');
    
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// update add product to cart --works--add product to cart 
//addtocart/:userid/:productid
const addToCart = async (req, res) => {
  const { quantity = 1 } = req.body; // Set default quantity to 1
  const {userId, productId} = req.params

  try {

      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex >= 0) {
          cart.products[productIndex].quantity += quantity;
      } else {
          cart.products.push({ productId, quantity });
      }

      await cart.save();
      res.status(200).json(cart);
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Get all carts --works -- to be used
// /getcart
const getAllCarts = async (req, res) => {
  try {
    const { limit = 0, sort = 'asc', startdate = '1970-01-01', enddate = new Date().toISOString() } = req.query;
    const carts = await Cart.find({
      date: { $gte: new Date(startdate), $lt: new Date(enddate) }
    })
      .limit(Number(limit))
      .sort({ id: sort === 'desc' ? -1 : 1 });
    res.json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get a single cart by cart ID --works not sure if i'll need it
// /getcart/:id
const getSingleCart = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Cart not found' });
    }

    const cart = await Cart.findById(id)
    // if (!cart) {
    //   return res.status(404).json({ error: 'Cart not found' });
    // }

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete a cart --will be used to clear cart data --too harsh, wont be used for now
// /deletecart/:id
// const deleteCart = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Cart.findByIdAndDelete(id);
//     res.status(201).json({message: 'Cart deleted successfully'});
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


// Update item quantity in a cart --to be used
// //updateqty/:id
const updateCartProductQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const {userId} = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const product = cart.products.find(p => p.productId.toString() === productId);
    if (product) {
      product.quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Product not found in cart' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//update and delete product in a cart --confirmed -to be used
// /delete/:userId/:productId
const deleteProductFromCart = async (req, res) => {
  try {
      const { userId, productId } = req.params;

      // Find the cart for the user and update it by removing the specified product 
      const cart = await Cart.findOneAndUpdate(
          { userId: userId },
          { $pull: { products: { productId: productId } } },
          { new: true }
      );

      if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
      }

      res.json({ message: "Product removed from cart", cart });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// clear cart items --to be used
// /clearcart/:userId
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
      const cart = await Cart.findOne({ userId });

      if (!cart) {
          return res.status(404).json({ error: 'Cart not found' });
      }

      cart.products = [];
      await cart.save();

      res.status(200).json(cart);
  } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCarts,
  getSingleCart,
  addCreateCart,
  addToCart,
  // deleteCart,
  updateCartProductQuantity,
  deleteProductFromCart,
  clearCart
};