var hapi = require('hapi');
var fs = require('fs');
var rot13 = require('rot13-transform');
var Path = require('path');
var server = new hapi.Server();
var readable = fs.createReadStream('./public/stream.txt');
var writeable = fs.createWriteStream('./public/stream.txt.gz');
var res = '';
readable.pipe(rot13()).pipe(writeable);
console.log(writeable);
server.connection({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});
server.route({
	path: '/',
	method: 'GET',
	handler: function (req, rep) {
		rep(fs.readFileSync('./public/stream.txt.gz'));
	}
});
server.start();