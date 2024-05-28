const express = require('express');
const router  = express.Router();

const {
    signin,
    signup,
    showAllUsers,
    deleteUser,
} = require('../controller/auth.controller.route.js');


router.post('/register', signup)

router.post('/login', signin)

router.get('/showusers', showAllUsers);

router.delete('/deleteuser/:id', deleteUser);



// router.post('/register', signup)
// router.post('/register', signup)

module.exports = router;