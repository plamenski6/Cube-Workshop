const { v4 } = require('uuid');
const { saveCube } = require('../controllers/database');

class Cube {
    constructor(name, description, imageURL, difficulty) {
        this.id = v4();
        this.name = name || 'No name';
        this.description = description;
        this.imageURL = imageURL || "placeholder";
        this.difficulty = difficulty || 0;
    }

    //Save Cube
    save(callback) {

        const newCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageURL: this.imageURL,
            difficulty: this.difficulty
        }

        saveCube(newCube, callback);
    }
}

module.exports = Cube;