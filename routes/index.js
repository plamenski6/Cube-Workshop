const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const { getUserStatus } = require('../controllers/user');

const router = new Router();

router.get('/', getUserStatus, async (req, res) => {
    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Cube Workshop',
        cubes,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('aId');

    res.redirect('/');
});

router.get('*', getUserStatus, (req, res) => {
    res.render('404', {
        title: 'Error',
        isLoggedIn: req.isLoggedIn
    });
});

module.exports = router;