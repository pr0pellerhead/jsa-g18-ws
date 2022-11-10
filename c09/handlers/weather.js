const fetch = require('node-fetch');

// let localCache = null;
// let cacheTime = null;
/*

{
    'Skopje': {
        localCache: '',
        cacheTime: ''
    },
    'Bitola': {
        localCache: '',
        cacheTime: ''
    },
}


*/
let cache = {};

const getCity = async (req, res) => {
    let key = '';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${key}`;

    if (cache[req.params.city] 
        && cache[req.params.city].cacheTime !== null 
        && cache[req.params.city].cacheTime + (60 * 1000) < new Date().getTime()
    ) {
        cache[req.params.city].localCache = null;
    }

    if (!cache[req.params.city] || cache[req.params.city].localCache === null) {
        let data = await fetch(url);
        cache[req.params.city] = {
            localCache: await data.json(),
            cacheTime: new Date().getTime()
        };
    }

    return res.send(cache[req.params.city].localCache);
};

module.exports = {
    getCity
};