const express = require('express');
const User = require('../models/user');
const { saveUser, verifyUser, guestAccess, getUserStatus } = require('../controllers/user');

const router = express.Router();

router.get('/login', guestAccess, getUserStatus, (req, res) => {

    res.render('loginPage', {
        title: 'Login Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/signup', guestAccess, getUserStatus, (req, res) => {

    res.render('registerPage', {
        title: 'Register Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/signup', async (req, res) => {

    const { password } = req.body;
    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
        return res.render('registerPage', {
            title: 'Register Page',
            error: 'Username or password is not valid'
        });
    }

    const { error } = await saveUser(req, res);

    if (error) {
        return res.render('registerPage', {
            title: 'Register Page',
            error: 'Username or password is not valid'
        });
    }

    res.redirect('/');
});

router.post('/login', async (req, res) => {

    const { error } = await verifyUser(req, res);

    if (error) {
        return res.render('loginPage', {
            title: 'Login Page',
            error: 'Username or password is not correct'
        });
    }

    res.redirect('/');
});

module.exports = router;