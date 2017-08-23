const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const rpio = require('rpio')

const Up = 15
const Down = 13
const Stop = 11

rpio.open(Up, rpio.OUTPUT);
rpio.open(Down, rpio.OUTPUT);
rpio.open(Stop, rpio.OUTPUT);

rpio.open(Up, rpio.OUTPUT, rpio.HIGH);
rpio.open(Down, rpio.OUTPUT, rpio.HIGH);
rpio.open(Stop, rpio.OUTPUT, rpio.HIGH);


app.use(express.static(__dirname + '/node_modules'));

app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(client) {
	console.log('Client connected...');

	client.on('join', function (data) {
		console.log(data);
	})

	client.on('open', function(){
		console.log('OPEN')
		push(Up)
	})

	client.on('close', function(){
		console.log('CLOSE')
		push(Down)
	})

	client.on('stop', function(){
		console.log('STOP')
		push(Stop)
	})


})

server.listen(4200);

console.log('Running on port 4200')

function push(n){

	high(n)

	function high(n){
		console.log('🔥', n)
		rpio.open(n, rpio.OUTPUT, rpio.LOW)
		setTimeout(() => low(n), 1000)
	}

	function low(n){
		rpio.open(n, rpio.OUTPUT, rpio.HIGH);
	}

}