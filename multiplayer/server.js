    var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/start.html");
});
app.get('/game.js', function (req, res) {
    res.sendFile(__dirname + "/game.js");
});
let players = [];

let playerCount = 0;
let colors = []
for (let i = 0; i < 100; i++) {
    colors.push('rgb(' + randomInteger(255) + ',' + randomInteger(255) + ',' + randomInteger(255) + ')')
}
io.on('connection', function (socket) {
    let id = playerCount++
    socket.emit('receiveId', id)
    players.push({ x: 0, y: 0, id: id, color: colors[id] })
    io.emit('receivePlayers', players)
    socket.on('move', function (dx, dy) {
        players[id].x = dx;
        players[id].y = dy;
        io.emit('move', id, dx, dy)
    })
    socket.on('aim', function (angle) {
        io.emit('aim', id, angle);
    })
    socket.on('ejaculate', function(newBullet_) {
        io.emit('ejaculate', id, newBullet_);
    })
    socket.on('bulletMove', function(bIndex, dX, dY){
        io.emit('bulletMove', id, bIndex, dX, dY);
    })
    socket.on('disconnect', function () {
        players[id].x = -100
        players[id].y = -100
    })
})
// var numClients = 0;
// io.on('connection', function(socket){
//     let id = numClients++;
//     socket.emit('id', id);
//     socket.on('move', function(dx, dy){
//         io.emit('move', id, dx, dy);
//     });
// });

http.listen(3000, function () {
    console.log("server started");
});