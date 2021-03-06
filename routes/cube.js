const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const express = require('express');
const Cube = require('../models/cube');
const { getCubeWithAccessories } = require('../controllers/cubes');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { checkAuth, getUserStatus } = require('../controllers/user');

router.get('/edit', checkAuth, getUserStatus, (req, res) => {
    res.render('editCubePage', {
        title: 'Edit Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/delete', checkAuth, getUserStatus, (req, res) => {
    res.render('deleteCubePage', {
        title: 'Delete Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/create', checkAuth, getUserStatus, (req, res) => {
    res.render('create', {
        title: 'Create Page',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create', checkAuth, async (req, res) => {

    const {
        name,
        description,
        imageUrl,
        difficultyLevel
    } = req.body;

    const token = req.cookies['aId'];
    const decodedObject = jwt.verify(token, config.privateKey);

    const cube = new Cube({
        name: name.trim(),
        description: description.trim(),
        imageUrl,
        difficulty: difficultyLevel,
        creatorId: decodedObject.userId
    });

    try {
        await cube.save();
        return res.redirect('/');
    } catch (err) {
        return res.render('create', {
            title: 'Create Page',
            error: 'Cube details are not valid'
        });
    }
});

router.get('/details/:id', getUserStatus, async (req, res) => {
    const cube = await getCubeWithAccessories(req.params.id);

    res.render('details', {
        title: 'Details',
        cube,
        isLoggedIn: req.isLoggedIn
    });
});

module.exports = router;