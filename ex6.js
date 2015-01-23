var hapi = require('hapi');
var server = new hapi.Server();
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 65536)
});
console.dir(server.info);

/*server.route({
	path: '/',
	method: 'GET',
	handler: function (req, rep) {
		rep('Hello Hapi');
	}
});*/
server.route({
	method: 'GET',
	path: '/proxy',
	handler: function(req, rep) {
		rep('Hello Proxies');
	}
});
console.log(process.argv);
server.start();