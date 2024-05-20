const express = require("express");
const mongoose = require("mongoose");
const PORT = 3005;

const bookRouter = require('./routes/book.route.js')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// app.use(cors({
//   origin: 'https://localhost:6000',
//   methods: ['GET', 'PUT', 'DELETE', 'POST'],
//   allowHeaders: ['content-type']
// }));

app.get("/", (req, res) => {
  res.send("Hello backend");
});

app.use('/api/book', bookRouter);


app.listen(PORT, (req, res) => {
    console.log(`listening on port ${PORT}`);
  });

  mongoose.connect("mongodb+srv://mishakmanuel:mydatabase4mongo@cluster0.zcwmmue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("Database is Connectido successfully!");
}).catch(()=>{
    console.log("Failed to connect");
});
