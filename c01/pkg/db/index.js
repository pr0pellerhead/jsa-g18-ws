const mongoose = require('mongoose');

const init = () => {
    const dsn = 'mongodb+srv://@cluster0.c3iyx.mongodb.net/mymovies?retryWrites=true&w=majority';
    mongoose.connect(
        dsn,
        err => {
            if(err) {
                return console.log('Could not connect to db', err);
            }
            console.log('Successfully connetcted to db');
        }
    )
};

module.exports = {
    init
};