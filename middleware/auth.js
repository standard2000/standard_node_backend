const jwt = require('jsonwebtoken');
const key = require('../config/config').secretkey;
const User = require('../models/userModel')

module.exports = (req, res, next) => {
//   const token = req.headers('x-auth-token');
    const token = req.headers.authorization;

    !token && res.status(401).json({ msg: 'No token, authorization denied!' });

    try {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Token is not valid!" });
            } else {
                User.findOne({ email: decoded.email })
                    .then(user => {
                        if (user) {
                            req.body.name = decoded.name;
                            req.body.email = decoded.email;
                            req.body.id= user.id;
                            // Token Valid then Next
                            next();
                        } else {
                            res.status(400).json({ success: false, img: 'User not found. Not valid token!' })
                        }
                    })
                    .catch(err => {
                        // console.log(err);
                    })
            }
        })
    } catch (err) {
        console.log('Wrong with auth middleware!');
        res.status(500).json({ msg: 'Server Error!' })
    }
}
