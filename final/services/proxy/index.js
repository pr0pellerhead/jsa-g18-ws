const config = require('../../pkg/config');
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

app.use(
    '/api/v1/storage', 
    proxy(
        'http://127.0.0.1:10001',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/storage${req.url}`}
    )
);

app.use(
    '/api/v1/auth',
    proxy(
        'http://127.0.0.1:10002',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10002/api/v1/auth${req.url}` }
    )
);

app.use(
    '/api/v1/posts',
    proxy(
        'http://127.0.0.1:10003',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:10003/api/v1/posts${req.url}` }
    )
);

app.use(
    '/',
    proxy(
        'http://127.0.0.1:3000',
        { proxyReqPathResolver: (req) => `http://127.0.0.1:3000/${req.url}` }
    )
);

const PORT = process.env.PORT || config.get('services').proxy.port;

app.listen(PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log('Service [proxy] successfully started on port', PORT);
})


// client (postman) --> service:port

// client (postman) --> proxy:port --> service1:port
// client (postman) --> proxy:port --> service2:port
// client (postman) --> proxy:port --> service3:port
// client (postman) --> proxy:port --> serviceN:port
