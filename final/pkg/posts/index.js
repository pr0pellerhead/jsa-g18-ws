const mongoose = require('mongoose');

const Post = mongoose.model(
    'posts',
    {
        author_id: String,
        content: String,
        published_on: Date
    },
    'posts'
);

const getAll = async () => {
    return Post.find({});
};

const getUserPosts = async (author_id) => {
    return Post.find({author_id});
};

const create = async (data) => {
    const p = new Post(data);
    return p.save();
};

const update = async (id, uid, data) => {
    return Post.updateOne({_id: id, author_id: uid}, data);
};

const remove = async (id, uid) => {
    return Post.deleteOne({_id: id, author_id: uid});
};

module.exports = {
    getAll,
    getUserPosts,
    create,
    update,
    remove
};