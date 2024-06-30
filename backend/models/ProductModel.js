const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    
    description: {
      type: String, // Expects a string value for description
      required: false
    },

    category: {
      type: String, // Expects a string value for category
      required: false
    },

    image: {
      type: String,
      require: false,
    },

    rating: Number,
  
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;