const config = require('../../pkg/config');
const db = require('../../pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const posts = require('./handlers/posts');
const authors = require('./handlers/authors');

db.init();

const api = express();

api.use(express.json());
api.use(jwt.expressjwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}));

api.get('/api/v1/posts/authors', authors.getAll);
api.get('/api/v1/posts', posts.getAll);
api.get('/api/v1/posts/me', posts.getMine);
api.get('/api/v1/posts/:handle', posts.getUsers);

api.post('/api/v1/posts', posts.create);
api.put('/api/v1/posts/:id', posts.update);
api.delete('/api/v1/post/:id', posts.remove);

api.listen(config.get('services').posts.port, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Service [posts] successfully started on port', config.get('services').posts.port);
});