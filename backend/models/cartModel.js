const mongoose = require('mongoose');
const Product = require('./ProductModel');
const User = require('./UserModel');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, // Reference the model name as a string
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product, // Reference the product model
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema); 
module.exports = Cart;
