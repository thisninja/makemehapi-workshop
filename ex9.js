var hapi = require('hapi');
var Joi = require('Joi');
var server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});
server.route({
	path: '/a/chickens/{breed}',
	method: 'GET',
	handler: function(req, rep) {
		rep('Hello chicken');
	},
	config: {
		validate: {
			params: {
				with: Joi.string().required(),
				breed: Joi.string().required()
			}
		}
	}
});
server.start();