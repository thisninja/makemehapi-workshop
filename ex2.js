var hapi = require('hapi');
var server = new hapi.Server();
server.connection({
	'host': 'localhost',
	'port': +(process.argv[2] || 8080)
});
server.route({
	path: '/',
	method: 'GET',
	handler: function(req, rep) {
		rep('Hello Hapi');
	}
});
server.route({
	path: '/{name}',
	method: 'GET',
	handler: handler
});
function handler(req, rep) {
	rep('Hello ' + req.params.name);
}
server.start();