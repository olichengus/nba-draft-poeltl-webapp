const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://draft-poeltl-backend-production.up.railway.app',
            changeOrigin: false,
        })
    );
};