var hapi = require('hapi');
var handlebars = require('handlebars');
var Path = require('path');
var server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});
server.route({
	path: '/',
	method: 'GET',
	handler: {
		view: "template.html"
	}
});
server.views({
	engines: {
		html: handlebars
	},
	path: Path.join(__dirname, 'template'),
	helpersPath: Path.join(__dirname, 'helpers')
})
server.start();