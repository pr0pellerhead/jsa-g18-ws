const upload = async (req, res) => {
    // console.log(req.files.slika);
    await req.files.slika.mv(`${__dirname}/../uploads/${req.files.slika.name}`);
    res.send('OK');
};

const download = async (req, res) => {
    res.send('OK');
};

module.exports = {
    upload,
    download
};