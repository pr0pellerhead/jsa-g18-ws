const mongoose = require('mongoose');

const Movie = mongoose.model(
    'movie',
    {
        name: String,
        year: Number
    },
    'movies'
);

const create = async (data) => {
    let m = new Movie(data);
    return m.save();
};

const getAll = async () => {
    return Movie.find({});
};

const getOne = async (id) => {
    return Movie.findOne({_id: id});
};

const updateOne = async (id, data) => {
    return Movie.updateOne({_id: id}, data);
};

const remove = async (id) => {
    return Movie.deleteOne({_id: id});
};

module.exports = {
    create,
    getAll,
    getOne,
    updateOne,
    remove
};