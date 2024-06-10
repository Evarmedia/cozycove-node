require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3005;

//Routes
const productRouter = require('./routes/product.route.js')
const userRouter = require('./routes/auth.route.js');
const cartRouter = require('./routes/cart.route.js');


const authMiddleware = require('./middleware/authMiddleware.js');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(authMiddleware);


// app.use(cors({
//   origin: 'https://localhost:0000',
//   methods: ['GET', 'PUT', 'DELETE', 'POST'],
//   allowHeaders: ['content-type']
// }));

app.get("/", (req, res) => {
  res.send("Hello backend");
});


//private route
app.use(process.env.AUTH_URL, userRouter);

// Prvate route
app.use(process.env.PRODUCT_URL, productRouter);
app.use(process.env.CART_URL, authMiddleware, cartRouter);

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
  });

  mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Mongodb Connected!");
}).catch(()=>{
    console.log("Failed to connect!");
});
