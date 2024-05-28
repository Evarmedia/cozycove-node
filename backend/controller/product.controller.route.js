const Product = require('../models/ProductModel.js');

const createProduct = async (req, res) => {
  const { title, quantity, price, } = req.body;
    try {
        if (!title || !quantity || !price) {
          return res
            .status(400)
            .json({ message: "Please enter all required fields" });
        }

        // Quick check to see if Product already exists
        const existingProduct = await Product.findOne({title})

        if(existingProduct){
          return res.json({message: "Item already exists, please Edit"})
        }
        const product = await Product.create(req.body);
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }

}

const getProducts = async (req, res) => {
    try {

       // Check if _limit query parameter is provided
       const limit = req.query._limit ? parseInt(req.query._limit) : null;

       // Fetch products with or without limit based on the presence of _limit in the url
       const products = limit ? await Product.find({}).limit(limit) : await Product.find({});

        // const products = await Product.find({});
        res.status(200).json({
          count: products.length,
          data: products,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const SingleProduct = await Product.findById(id);
        res.status(200).json(SingleProduct)

      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const SingleProduct = await Product.findByIdAndUpdate(id, req.body);
        if (!SingleProduct) {
          return res.send({ message: "product not found" });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({ message: "Product updated Successfully" });
        // res.status(200).json(updatedProduct);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "product not found, please use a valid id" });
        }
        
        res.status(200).json({message: "Product successfully deleted"})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
};