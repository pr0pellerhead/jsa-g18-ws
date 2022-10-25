const fs = require('fs');

let config = null;

if(!config) {
    let data = fs.readFileSync(`${__dirname}/../../config.json`);
    config = JSON.parse(data);
}

const get = (section) => {
    if(config[section]) {
        return config[section];
    }
    return null;
};

module.exports = {
    get
};