const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
    res.send({ message: "You are communicating with user api" });
});


module.exports = router;