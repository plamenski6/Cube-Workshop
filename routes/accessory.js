const express = require('express');
const { getCube, updateCube } = require('../controllers/cubes');
const { getAccessories } = require('../controllers/accessories');
const router = express.Router();
const { checkAuth, getUserStatus } = require('../controllers/user');

router.get('/create/accessory', checkAuth, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/create/accessory', checkAuth, async(req, res) => {
    const{
        name, 
        description,
        imageUrl
    } = req.body;

    const accessory = new Accessory({
        name,
        description,
        imageUrl
    });

    await accessory.save();
    res.redirect('/create/accessory');
});

router.get('/attach/accessory/:id', checkAuth, getUserStatus, async(req, res) => {
    const cube = await getCube(req.params.id);
    const accessories = await getAccessories();

    const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

    const notAttachedAccessories = accessories.filter(acc => {
        const accessoryString = acc._id.valueOf().toString();
        return !cubeAccessories.includes(accessoryString)
    });

    res.render('attachAccessory', {
        title: 'Attach accessory',
        cube,
        accessories: notAttachedAccessories,
        canNotAttached: accessories.length === 0 || cube.accessories.length === accessories.length,
        isLoggedIn: req.isLoggedIn
    });
});

router.post('/attach/accessory/:id', checkAuth, async(req, res) => {
    const {
        accessory
    } = req.body;

    await updateCube(req.params.id, accessory);

    res.redirect(`/details/${req.params.id}`);
});

module.exports = router;