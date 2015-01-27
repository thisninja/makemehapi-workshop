var hapi = require('hapi');
var Joi = require('Joi');
var server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});
server.state('session', {
    ttl: 10,
    path: '/{path*}',
    encoding: 'base64json',
    domain: 'localhost'
});
server.route({
    path: '/set-cookie',
    method: 'GET',
    handler: function(req, rep) {
        var session = req.state.session;
        rep('Success, hooray!').state('session', {key: 'makemehapi'});
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});
server.route({
    path: '/get-cookie',
    method: 'GET',
    handler: function(req, rep) {
        var responce;
        var session = req.state.session;
        (session)? responce = {
            user: 'hapi'
        }: responce = new Hapi.error('Unathorized error');
        rep(responce);
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});
server.start();
