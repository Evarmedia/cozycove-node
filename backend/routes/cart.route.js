const express = require('express');
const router = express.Router();
const {
  getAllCarts,
  getSingleCart,
  addCreateCart,
  addToCart,
  // deleteCart,
  updateCartProductQuantity,
  deleteProductFromCart,
  clearCart
} = require('../controller/cart.controller.route.js');

// Route to add a new cart
router.post('/create_getcart/:userId', addCreateCart);

// Route to edit a cart
router.put('/addtocart/:userId/:productId', addToCart);

// Route to get all carts
router.get('/getcart', getAllCarts);

// Route to get a single cart by cart ID
router.get('/getcart/:id', getSingleCart);

// Route to update item quantity in a cart *might not be necessary later*
router.put('/updateqty/:userId', updateCartProductQuantity);

//Route to delete product from cart
router.delete('/delete/:userId/:productId', deleteProductFromCart);

// remove all products from cart
router.delete('/clearcart/:userId', clearCart);

// Route to delete a cart
// router.delete('/deletecart/:id', deleteCart);

module.exports = router;
