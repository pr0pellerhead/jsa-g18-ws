const express = require('express');
const mailer = require('./handlers/mailer');
const config = require('./pkg/config');

const api = express();
api.use(express.json());

api.post('/api/v1/mailer/welcome', mailer.sendWelcome);
api.post('/api/v1/mailer/reset-password', mailer.sendResetPassword);

api.listen(config.get('service').port, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Service started on port', config.get('service').port);
});