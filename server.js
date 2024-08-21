const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const user = require("./routes/api/user");

// connect mongodb
const db = require('./config/config').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log(`mongodb connected on ${db}`))
  .catch((err) => console.log(err));

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// test
app.get('/', function (req, res) {
  res.send('Hello World')
});


// routes
app.use("/api/users", user);


const PORT = 5000;

// run server
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});