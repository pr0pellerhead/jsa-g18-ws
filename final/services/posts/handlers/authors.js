const authors = require('../../../pkg/authors');

const getAll = async (req, res) => {
    try {
        let as = await authors.getAll();
        res.status(200).send(as);
    } catch (err) {
        return res.status(500).send('ISE!');
    }
};

module.exports = {
    getAll
};