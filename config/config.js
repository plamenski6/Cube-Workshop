module.exports = {
    development: {
        port: process.env.PORT || 3000,
        privateKey: 'CUBE-WORKSHOP',
        databaseURL:`mongodb+srv://plamenski6:dbPass@cluster0-j6rki.mongodb.net/cubicle?retryWrites=true&w=majority`
    },
    production: {}
};