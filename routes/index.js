const { Router } = require('express');
const { getAllCubes } = require('../controllers/cubes');
const Cube = require('../models/cube');
const Accessory = require('../models/accessory');

const router = new Router();

router.get('/', async (req, res) => {
    const cubes = await getAllCubes();

    res.render('index', {
        title: 'Cube Workshop',
        cubes
    });
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    });
});

router.get('*', (req, res) => {
    res.render('404', {
        title: 'Error'
    });
});

module.exports = router;