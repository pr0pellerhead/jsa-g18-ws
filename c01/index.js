const express = require('express');
const movies = require('./handlers/movies');
const db = require('./pkg/db');

db.init();

const app = express();

app.use(express.json());

app.get('/movies', movies.getAll);
app.get('/movies/:id', movies.getOne);
app.post('/movies', movies.create);
app.put('/movies/:id', movies.update);
app.patch('/movies/:id', movies.partialUpdate);
app.delete('/movies/:id', movies.remove);

app.listen(10000, err => {
    if(err){
        return console.log('Could not start service');
    }
    console.log('Service started successfully on port 10000');
});
/*

APIs - Application Progamming Interface

REST - REpresentational State Transfer

RESTfull
RESTless

movies = resource

get /movies
get /movies/:id
post /movies
put /movies/:id
patch /movies/:id
delete /movies/:id


put /movies/123
patch /movies/123

{
    _id: 123,
    name: 'Star Wars',
    year: 1982
}

{
    year: 1980
}

*/