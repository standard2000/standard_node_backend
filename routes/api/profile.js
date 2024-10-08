const express = require('express')
const router = express.Router();
const Profile = require('../../models/profileModel');
const auth = require('../../middleware/auth');

router.post('/', auth, (req, res) => {
    console.log(req.body);

    const { id, name, birthday, university, faculty, major, grade, hometown, skills } = req.body;

    const profileField = {
        user: id,
        name: name,
        birthday: birthday,
        university: university,
        faculty: faculty,
        major: major,
        grade: grade,
        hometown: hometown,
        skills: skills
    }

    Profile.findOneAndUpdate(
        { user: id },
        { $set: profileField },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    ).then(userProfile => {
        
        res.json({success: true, userProfile});
    })
    .catch(err => {
        res.json({success: false, err})
    })

});


router.get('/all', auth, (req, res) => {
    Profile.find({})
        .then(allProfile => {
            res.json({success: true, allProfile})
        })
        .catch(err=> {
            console.log(err);
            res.json({success: false})
        })
    
})


router.delete('/', auth, (req, res) => {
    Profile.findOneAndRemove({user: req.body.id})
        .then(deleted => {
            if(deleted) {
                res.json({success: true, deleted})
            } else {
                res.json({success: false})
            }
        })
        .catch(err=> {
            console.log(err);
            res.json({errer: 'error'})
        })
})

module.exports = router;