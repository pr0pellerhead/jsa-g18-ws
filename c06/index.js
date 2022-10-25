// get /authors - ги дава сите автори
// get /posts - ги дава сите постови
// get /posts/me - ги дава сите ваши постови
// get /posts/:handle (@bojang) - ги дава сите постови на одреден корисник (@bojang)

// post /posts - креира нов пост
// put /posts/:id - менува пост
// delete /post/:id - брише пост

// post
// {
//     _id: (...),
//     author_id: (...),
//     content: (...),
//     published_on: (...)
// }

// author
// {
//     _id: (...),
//     handle: (...),
//     full_name: (...)
// }
const config = require('./pkg/config');
const db = require('./pkg/db');
const express = require('express');
const jwt = require('express-jwt');
const posts = require('./handlers/posts');
const authors = require('./handlers/authors');

db.init();

const api = express();

api.use(express.json());
api.use(jwt.expressjwt({
    algorithms: ['HS256'],
    secret: config.get('service').jwt_secret
}));

api.get('/authors', authors.getAll);
api.get('/posts', posts.getAll);
api.get('/posts/me', posts.getMine);
api.get('/posts/:handle', posts.getUsers);

api.post('/posts', posts.create);
api.put('/posts/:id', posts.update);
api.delete('/post/:id', posts.remove);

api.listen(config.get('service').port, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Service started on port', config.get('service').port);
});