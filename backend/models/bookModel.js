const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },
    publishedYear: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },

  {
    timestamps: true,
  }
);

const Book = mongoose.model('Bookdb', bookSchema);
module.exports = Book;