const posts = require('../../../pkg/posts');
const authors = require('../../../pkg/authors');

const getAll = async (req, res) => {
    try {
        let ps = await posts.getAll();
        res.status(200).send(ps);
    } catch(err) {
        return res.status(500).send('ISE!');
    }
};

const getMine = async (req, res) => {
    try {
        let ps = await posts.getUserPosts(req.auth.uid);
        res.status(200).send(ps);
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

const getUsers = async (req, res) => {
    try {
        let u = await authors.getByHandle(req.params.handle);
        let ps = await posts.getUserPosts(u._id);
        res.status(200).send(ps);
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

const create = async (req, res) => {
    try {
        let payload = {
            ...req.body,
            author_id: req.auth.uid,
            published_on: new Date()
        };
        let c = await posts.create(payload);
        return req.status(201).send(c);
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

const update = async (req, res) => {
    try {
        let payload = {
            ...req.body,
            author_id: req.auth.uid,
            published_on: new Date()
        };
        await posts.update(req.params.id, req.auth.uid, payload);
        return req.status(204).send('');
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

const remove = async (req, res) => {
    try {
        await posts.remove(req.params.id, req.auth.uid);
        return req.status(204).send('');
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

module.exports = {
    getAll,
    getMine,
    getUsers,
    create,
    update,
    remove
};