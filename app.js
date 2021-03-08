const express   = require('express');
const app       = express();
const http      = require('http');
const server    = require('http').createServer(app);  
const io        = require('socket.io')(server);

const LISTEN_PORT   = 8080;

server.listen(LISTEN_PORT);
app.use(express.static(__dirname + '/public')); //set root path of server ...

console.log("Listening on port: " + LISTEN_PORT );

//our routes
app.get( '/', function( req, res ){ 
    res.sendFile( __dirname + '/public/index.html' );
});

app.get( '/Player1-2D', function( req, res ){ 
    res.sendFile( __dirname + '/public/Player1-2D.html' );
});

app.get( '/Player2-3D', function( req, res ){ 
    res.sendFile( __dirname + '/public/Player2-3D.html' );
});

//socket.io stuff
io.on('connection', (socket) => {

    console.log( socket.id + " connected" );

    socket.on('disconnect', () => {
        console.log( socket.id + " disconnected" );
    });

    socket.on("red1", (data) => {
        console.log( "red1 event received" );
        io.sockets.emit("color_change2", {r:255, g:0, b:0});
    });

    socket.on("red2", (data) => {
        console.log( "red2 event received" );
        io.sockets.emit("color_change1", {r:255, g:0, b:0});
    });

    socket.on("blue1", (data) => {
        console.log( "blue1 event received" );
        io.sockets.emit("color_change2", {r:0, g:0, b:255});
    });

    socket.on("blue2", (data) => {
        console.log( "blue2 event received" );
        io.sockets.emit("color_change1", {r:0, g:0, b:255});
    });

    socket.once("green", (data) => {
        console.log( "green event received" );
        io.sockets.emit("color_changeG", {r:0, g:255, b:0});
    });

    //infinite loop with a millisecond delay (but only want one loop running ...)
    //a way to update all clients simulatenously every frame i.e. updating position, rotation ...
    // if (setIntervalFunc == null) {
    //     console.log("setting interval func");
    //     setIntervalFunc = setInterval( () => {
    //         //if we want to do loops 
    //     }, 50);
    // }
});