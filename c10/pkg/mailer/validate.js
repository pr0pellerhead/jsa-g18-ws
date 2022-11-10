const { Validator } = require('node-input-validator');

const WELCOME = {
    from: 'required|email',
    to: 'required|email',
    subject: 'required|string',
    first_name: 'required|string',
    last_name: 'required|string'
};

const RESET_PASSWORD = {
    from: 'required|email',
    to: 'required|email',
    subject: 'required|string',
    first_name: 'required|string'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema);
    let m = await v.check();
    if(!m) {
        throw 'Invalid data';
    }
};

module.exports = {
    WELCOME,
    RESET_PASSWORD,
    validate
};

