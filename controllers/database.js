const fs = require('fs');
const path = require('path');
const databaseFile = path.join(__dirname, '..', 'config/database.json');

const saveCube = (cube, callback) => {
    getCubes((cubes) => {
        cubes.push(cube);

        fs.writeFile(databaseFile, JSON.stringify(cubes), (error) => {
            if (error) {
                throw error;
            }
            console.log('New cube is stored!');
            callback();
        });
    });
}

const getCube = (id, callback) => {
    getCubes((cubes) => {
        const cube = cubes.filter(c => c.id ===id)[0];
        callback(cube); 
    });
}

const getCubes = (callback) => {
    fs.readFile(databaseFile, (error, data) => {
        if (error) {
            throw (error);
        }
        const cubes = JSON.parse(data);
        callback(cubes);
    });
}

module.exports = {
    getCube,
    getCubes,
    saveCube
}