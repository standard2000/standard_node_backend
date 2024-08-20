const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

const PORT = 5000;

app.listen(port, () => {
    console.log(`server is running on port ${PORT}`);
})