const bcrypt = require('bcryptjs');
const user = require('../../../pkg/user');
const jwt = require('jsonwebtoken');
const config = require('../../../pkg/config');

const create = async (req, res) => {    
    try {
        // 1. провери дали двете лозинки се еднакви
        if(
            // req.body.password.trim().length === 0 || 
            req.body.password.length === 0 || 
            req.body.password !== req.body.password2 
        ) {
            return res.status(400).send('Bad request');
        }
        // 2. провери дали постои корисник со истиот email во база
        let u = await user.getUserByEmail(req.body.email);
        if(u) {
            return res.status(409).send('Conflict');
        }
        // 3. хашувај ја лозинката
        req.body.password = bcrypt.hashSync(req.body.password);
        // 4. запиши го новиот корисник во база
        let usr = user.create(req.body);
        return res.status(201).send(usr);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const login = async (req, res) => {
    try {
        // 1. проверка дали корисникот со дадениот email постои
        let u = await user.getUserByEmail(req.body.email);
        if (!u) {
            return res.status(400).send('Bad request. Bad login credentials');
        }
        // 2. проверка дали внесената лозинка на корисникот се совпаѓа со таа од базата
        if(!bcrypt.compareSync(req.body.password, u.password)) {
            return res.status(400).send('Bad request. Bad login credentials');
        }
        // 3. се генерира и испраќа токен
        let payload = {
            uid: u._id,
            email: u.email,
            full_name: u.full_name
        };
        let token = jwt.sign(payload, config.get('security').jwt_secret);
        return res.status(200).send({token});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal server error');
    }
};

const forgotPassword = (req, res) => {
    return res.send('ok');
};

const resetPassword = (req, res) => {
    return res.send('ok');
};

const validate = (req, res) => {
    console.log(req.auth);
    return res.status(200).send(req.auth); // return the token payload
};

module.exports = {
    create,
    login,
    forgotPassword,
    resetPassword,
    validate
};