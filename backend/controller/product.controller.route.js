const Product = require('../models/ProductModel.js');
const cloudinary = require('../utils/cloudinary.js')


const createProduct = async (req, res) => {
  const { title, quantity, price, description, category, rating} = req.body;
    try {
        if (!title || !quantity || !price) {
          return res
            .status(400)
            .json({ message: "Please enter all required fields" });
        }

        // Quick check to see if Product already exists
        const existingProduct = await Product.findOne({title})

        if(existingProduct){
          return res.json({message: "Item already exists, please edit instead"})
        }
        
        // const image = req.file ? `/uploads/${req.file.filename}` : null;


        let image = null;
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          image = result.secure_url;  // Use the secure URL from Cloudinary
        }

        const productData = { ...req.body, image: image}
        const product = await Product.create(productData);
        res.status(200).json(product);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }

}

const getProducts = async (req, res) => {
  try {
      // Extract query parameters
      const { category, _limit } = req.query;

      // Build query object
      const query = {};
      if (category) {
          query.category = category;
      }

      // Fetch products with or without limit based on the presence of _limit in the URL
      const products = _limit
          ? await Product.find(query).limit(parseInt(_limit))
          : await Product.find(query);

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