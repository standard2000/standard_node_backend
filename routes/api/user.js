const express = require("express");
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require("../../config/config").secretkey;


router.get("/test", (req, res) => {
    res.send({ message: "You are communicating with user api" });
});

const User = require('../../models/userModel');
// User register 
router.post('/register', (req, res) => {
    let { name, email, password, password2 } = req.body;
    const errors = {};

    console.log(req.body);
    if (validator.isEmpty(name)) {
        errors.message = "You must input your name!";
        return res.send(errors);
    }
    if (name.length < 8) {
        errors.message = "You must input your name correctly!";
        return res.send(errors);
    }
    if (!validator.isEmail(email)) {
        errors.message = "Not valid email!";
        return res.send(errors);
    }
    if (password.length < 5) {
        errors.message = "Password must be more than 6 letters";
        return res.send(errors);
    }
    if (password != password2) {
        errors.message = "Password must be matched";
        return res.send(errors);
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) {
                errors.user = "Email already exsits!"
                return res.status(400).json(errors)
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                });

                saltRounds = 10;
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;

                        newUser.save()
                            .then((user) => res.status(200).json({ success: true, user }))
                            .catch((err) => res.status(400).send(err))
                    })
                })
            }
        })
        .catch(err => {
            res.status(500).send(err);
            console.log(err);
        })

})

// User login 
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const errors = {};
    User.findOne({ email: email }).then(user => {
        if (!user) {
            errors.message = "Email does not exists!";
            return res.json(errors)
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
                errors.message = "Password incorrect!";
                res.json(errors)
            }

            const payload = { name: user.name, email: user.email }
            jwt.sign(payload, key, { expiresIn: 3600 }, (err, token) => {
                res.status(200).json({
                    success: true,
                    token: token
                })
            })


        })

    });
});

// Token test
router.post('/getdata', (req, res) => {
    const token = req.headers.authorization;

    console.log('--------', req);
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(400).json({ success: false, img: 'Not valid token!' })
        } else {
            console.log(decoded)
            const decodeData = decoded

            User.findOne({ email: decoded.email }).then(user => {
                    if (user) {

                        console.log(user);
                        res.status(200).json(decodeData);
                    } else {
                        res.status(400).json({ success: false, img: 'Not valid token!' })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    })
})

// auth Get User Info
router.post('/getUserInfo', auth, (req, res) => {
    console.log("req", req.body);
    res.status(400).json({ hello: 'hello' });
});


module.exports = router;