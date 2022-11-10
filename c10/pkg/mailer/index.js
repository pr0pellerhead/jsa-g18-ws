const fs = require('fs');
const Mailgun = require('mailgun.js');
const formData = require('form-data');
const config = require('../config');
const validator = require('./validate');

const send = async (template, data) => {
    if(!validator[template]) {
        throw 'Validation schema does not exist!';
    }
    validator.validate(data, validator[template]);
    let templatePath = `${__dirname}/../../email_templates/${template}.html`;
    if(!fs.existsSync(templatePath)) {
        throw 'Template does not exist!';
    }
    let tpl = fs.readFileSync(templatePath, 'utf8');
    let html = parseTemplate(tpl, data);
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
        username: config.get('mailer').username,
        key: config.get('mailer').key
    });
    let out = await mg.messages.create(config.get('mailer').domain, {
        from: data.from,
        to: data.to,
        subject: data.subject,
        html: html
    });
    console.log(out);
};

const parseTemplate = (template, data) => {
    /*
    data
    {
        first_name: 'Bojan',
        last_name: 'Gavrovski',
        from: 'bojan@bojan.com',
        to: 'bojan@bojan.com',
    }

    {{first_name}} -> Bojan
    {{last_name}} -> Gavrovski
    */
    for(let d in data) {
        // template = template.replaceAll(`{{${d}}}`, data[d]);
        let rx = new RegExp(`\{\{${d}\}\}`, 'g');
        template = template.replace(rx, data[d]);
    }
    return template;
};

module.exports = {
    send
};