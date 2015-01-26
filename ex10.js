var hapi = require('hapi');
var Joi = require('Joi');
var server = new hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});
server.route({
    path: '/login',
    method: 'POST',
    handler: function(req, rep) {
        rep('login successful');
    },
    config: {
        validate: {
            payload: Joi.object({
                isGuest: Joi.boolean().required(),
                username: Joi.when('isGuest', {
                    is: false,
                    then: Joi.required()
                }),
                accessToken: Joi.string().alphanum(),
                password: Joi.string().alphanum()
            }).options({
                allowUnknown: true
            }).without('password', 'accessToken')
        }
    }
});
server.start();
