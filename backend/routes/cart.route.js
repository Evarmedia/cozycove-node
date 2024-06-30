const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {
  getAllCarts,
  getSingleCart,
  addCreateCart,
  addToCart,
  deleteCart,
  updateCartProductQuantity,
  deleteProductFromCart,
  clearCart,
  // syncCart,
} = require('../controller/cart.controller.route.js');

// Route to add a new cart
router.post('/create_getcart/:userId', authMiddleware, addCreateCart);

// Route to edit a cart
router.put('/addtocart/:userId/:productId', authMiddleware, addToCart);

// Route to get all carts
router.get('/getcart', authMiddleware, getAllCarts);

// Route to get a single cart by cart ID
router.get('/getcart/:cartId', authMiddleware, getSingleCart);

// Route to update item quantity in a cart *might not be necessary later*
// /updateqty/
router.put('/updateqty/:userId', authMiddleware,updateCartProductQuantity);

//Route to delete product from cart
router.delete('/delete/:userId/:productId', authMiddleware, deleteProductFromCart);

// remove all products from cart
router.delete('/clearcart/:userId', authMiddleware, clearCart);

// Route to delete a cart use cartid
router.delete('/deletecart/:id', authMiddleware, deleteCart);

// // Sync Cart Route
// router.post('/sync_cart/:userId', authMiddleware, syncCart);

module.exports = router;
