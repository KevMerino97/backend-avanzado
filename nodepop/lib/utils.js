'use strict';

function isAPIRequest(req) {
    // if (req.originalUrl.indexOf('/api/') === 0)
    return req.originalUrl.startsWith('/api/');
}

module.exports = {
    isAPIRequest
}