const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
    let fileTypes = ['image/png', 'image/jpg', 'image/pjpeg', 'image/jpeg', 'image/gif'];
    let maxFileSize = 1024 * 1024;
    if(!fileTypes.includes(req.files.slika.mimetype)) {
        return res.status(400).send('Bad request!');
    }
    if (maxFileSize < req.files.slika.size) {
        return res.status(400).send('Bad request!');
    }
    let newFileName = `${strings.random(10)}__${req.files.slika.name}`;
    await req.files.slika.mv(`${__dirname}/../../../uploads/${newFileName}`);
    res.status(201).send({filename: newFileName});
};

const download = async (req, res) => {
    let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
    res.download(filePath, req.params.file.split('__')[1]);
};

module.exports = {
    upload,
    download
};