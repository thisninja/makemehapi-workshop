var hapi = require('hapi');
var Joi = require('Joi');
var server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});
server.route({
    path: '/upload',
    method: 'POST',
    config: {
        handler: function(req, rep) {
            var body = '';
            req.payload.file.on('data', function(data) {
                body += data;
            });
            req.payload.file.on('end', function() {
                var responce = {
                    description: req.payload.description,
                    file: {
                        data: body,
                        filename: req.payload.file.hapi.filename,
                        headers: req.payload.file.hapi.headers
                    }
                }
                rep(responce);
            });
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});
server.start();
