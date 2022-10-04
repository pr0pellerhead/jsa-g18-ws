const movies = require('../pkg/movies');

const getAll = async (req, res) => {
    try {
        let data = await movies.getAll();
        res.send(data).status(200);
    } catch(err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

const getOne = async (req, res) => {
    try {
        let data = await movies.getOne(req.params.id);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

const create = async (req, res) => {
    try {
        let data = req.body;
        await movies.create(req.body);
        res.send(data).status(201);
    } catch (err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

const update = async (req, res) => {
    try {
        let data = req.body;
        await movies.updateOne(req.params.id, req.body);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

const partialUpdate = async (req, res) => {
    try {
        let data = req.body;
        await movies.updateOne(req.params.id, req.body);
        res.send(data).status(200);
    } catch (err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

const remove = async (req, res) => {
    try {
        await movies.remove(req.params.id);
        res.send('').status(200);
    } catch (err) {
        console.log(err);
        res.send('Internal Server Error').status(500);
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    partialUpdate,
    remove
};
