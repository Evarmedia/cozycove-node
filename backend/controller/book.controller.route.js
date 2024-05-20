const Book = require('../models/bookModel.js');

const createBooks = async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishedYear) {
          return res
            .status(400)
            .json({ message: "Please enter all required fields" });
        }
        // if (!isNaN(req.body.publishedYear)) {
        //   // Handle the case where publishedYear is not a number
        //   return res.status(403).send({ message: "Please enter a number" });
        // }
        const book = await Book.create(req.body);
        res.status(200).json(book);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }

}

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json({
          count: books.length,
          data: books,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
}

const getBook = async (req, res) => {
    try {
        const { id } = req.params;
        const Singlebook = await Book.findById(id);
        res.status(200).json(Singlebook)

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const SingleBook = await Book.findByIdAndUpdate(id, req.body);
        if (!SingleBook) {
          return res.send({ message: "Book not found" });
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found, please use a valid id" });
        }
        
        res.status(200).json({message: "Book successfully deleted"})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createBooks,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
};