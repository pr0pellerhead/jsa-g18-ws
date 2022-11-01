require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
// const { expressjwt: jwt } = require('express-jwt');
const storage = require('./handlers/storage');

const api = express();

api.use(fileUpload());

api.post('/api/v1/storage', storage.upload);
api.get('/api/v1/storage/:file', storage.download);

api.listen(process.env.PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service successfully started on port ${process.env.PORT}`);
});