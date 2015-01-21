var hapi = require('hapi');
var server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: +(process.argv[2] || 8080)
});
server.route({
    path: '/',
    method: 'GET',
    handler: {
        file: 'index.html'
    }
});
server.start();
