const express = require("express");
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt');

router.get("/test", (req, res) => {
    res.send({ message: "You are communicating with user api" });
});

const User = require('../../models/userModel');
// register 
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

module.exports = router;