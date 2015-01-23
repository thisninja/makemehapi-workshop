var hapi = require('hapi');
var handlebars = require('handlebars');
var Path = require('path');
var server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: +(process.argv[2] || 8080)
});
/*server.route({
	path: '/',
	method: 'GET',
	handler: function (req, rep) {
		rep('Hello Hapi');
	}
});*/
server.route({
	path: '/{Handling?}',
	method: 'GET',
	handler: {
		view: "index.html"
	}
});
server.views({
	engines: {
		html: handlebars
	},
	path: Path.join(__dirname, 'template')
})
server.start();