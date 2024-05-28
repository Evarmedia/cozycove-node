const express = require('express');
const router = express.Router();
const {
  getAllCarts,
  getCartByUserId,
  getSingleCart,
  addToCart,
  editCart,
  deleteCart,
  updateCartItemQuantity
} = require('../controller/cart.controller.route.js');

// Route to get all carts
router.get('/getcart', getAllCarts);

// Route to get carts by user ID
router.get('/getcart/user/:userid', getCartByUserId);

// Route to get a single cart by cart ID
router.get('/getcart/:id', getSingleCart);

// Route to add a new cart
router.post('/addcart', addToCart);

// Route to edit a cart
router.put('/editcart/:id', editCart);

// Route to delete a cart
router.delete('/deletecart/:id', deleteCart);

// Route to update item quantity in a cart *might not be necessary later*
router.put('/item/updatequantity', updateCartItemQuantity);

module.exports = router;
