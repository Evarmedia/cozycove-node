const mongoose = require('mongoose');
const Cart = require('../models/cartModel.js');

// Get all carts --works
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

// Get cart by user ID --works
const getCartByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const { startdate = '1970-01-01', enddate = new Date().toISOString() } = req.query;
    const carts = await Cart.find({
      userId: userid,
      date: { $gte: new Date(startdate), $lt: new Date(enddate) }
    })
    res.json(carts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single cart by cart ID --works
const getSingleCart = async (req, res, next) => {
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

// creates a new cart ---works
const addToCart = async (req, res) => {
  try {
    const { userId, date, products } = req.body;

    if (!userId || !date || !products) {
        return res.status(400).json({
          status: 'error',
          message: 'userId, date, and products list are required',
        });
      }

    const cart = new Cart({ userId, date, products });
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// update Edit a cart --works--add product to cart
const editCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, date, products } = req.body;
    const cart = await Cart.findByIdAndUpdate(id, { userId, date, products }, { new: true });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a cart --works fine
const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(201).json({message: 'Cart deleted successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update item quantity in a cart
const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // looks thru the product array to check product exists in the cart
    
    const product = cart.products.find(p => p.productId.toString() === productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found in cart' });
    }

    if (!quantity) {
      res.status(404).json({ error: 'Please update quantity' });
    }
    product.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCarts,
  getCartByUserId,
  getSingleCart,
  addToCart,
  editCart,
  deleteCart,
  updateCartItemQuantity
};