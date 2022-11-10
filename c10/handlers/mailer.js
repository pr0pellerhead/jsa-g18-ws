const mailer = require('../pkg/mailer');

const sendWelcome = async (req, res) => {
    try {
        mailer.send('WELCOME', req.body);
        res.send('OK');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
};

const sendResetPassword = async (req, res) => {
    try {
        mailer.send('RESET_PASSWORD', req.body);
        res.send('OK');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error!');
    }
};

module.exports = {
    sendWelcome,
    sendResetPassword
};