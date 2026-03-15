/**
 * CRA Dev-Server Proxy Configuration (REINFORCED)
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const djangoProxy = createProxyMiddleware({
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        xfwd: true, // Forward proxy headers
    });

    /**
     * PROXY FILTER:
     * We need to catch /login/, /signup/, /logout/, and /me/
     * regardless of whether there is a trailing slash or not.
     */
    const authPaths = [
        '/login', '/login/',
        '/signup', '/signup/',
        '/logout', '/logout/',
        '/me', '/me/',
        '/static/styles',
        '/static/images'
    ];

    app.use(authPaths, djangoProxy);
};
