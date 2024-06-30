const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const upload = require('../config/upload.js');



const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/product.controller.route.js');

router.post('/', authMiddleware, upload.single('image'), createProduct);

router.get('/', getProducts);

router.get('/:id', getProduct);

router.put('/:id', authMiddleware, updateProduct);

router.delete('/deleteproduct/:id', authMiddleware, deleteProduct);

module.exports = router;