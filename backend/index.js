const express = require("express");
const mongoose = require("mongoose");
const PORT = 3005;

const productRouter = require('./routes/product.route.js')
const userRouter = require('./routes/user.route.js');
const cartRouter = require('./routes/cart.route.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(cors({
//   origin: 'https://localhost:0000',
//   methods: ['GET', 'PUT', 'DELETE', 'POST'],
//   allowHeaders: ['content-type']
// }));

app.get("/", (req, res) => {
  res.send("Hello backend");
});

app.use('/api/product', productRouter);
app.use('/api/product/auth', userRouter);
app.use('/api', cartRouter);

app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
  });

  mongoose.connect("mongodb+srv://mishakmanuel:mydatabase4mongo@cluster0.zcwmmue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Mongodb Connected!");
}).catch(()=>{
    console.log("Failed to connect!");
});
