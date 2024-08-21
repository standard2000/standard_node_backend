const express = require('express')
const app = express()
const mongoose = require('mongoose');


const db = require('./config/config').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log(`mongodb connected on ${db}`))
    .catch((err) => console.log(err))

app.get('/', function (req, res) {
  res.send('Hello World')
})

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})