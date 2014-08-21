var io;
var socketio = require('socket.io');

var onConnection = function(socket) {
	console.log('socket connection from ' + socket.id);
	socket.on('subscribe', function(data) {
		console.log('socket subscription for: ' + data.topic);
		socket.join(data.topic);
	});
};

var send = function(topic, obj, senderId) {
	io.sockets.in(topic).except(senderId).emit(topic, obj);
};

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('transports', ['xhr-polling']);
	io.sockets.on('connection', onConnection);
};

exports.send = send;
