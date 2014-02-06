'use strict';

var Hapi = require('hapi');
var Primus = require('primus');

// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 8000, {cors:true, files: {relativeTo: './routes'}}).on('err', function  (err) {
    console.log(err);
})


var primus = new Primus(server.listener);
var connections = new Array;
//var log = new Array;
// /*
var log =[];
// */
//Home Page route
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        reply.file(__dirname + '/home.html');


    }
});

//scripts resource
server.route({
    method: 'GET',
    path: '/scripts.js',
    handler: function (request, reply) {  

        reply.file(__dirname + '/scripts.js');

    }
});

//Primus' own set up resource
server.route({
    method: 'GET',
    path: '/primus.js',
    handler: function (request, reply) {

        reply.file('./primus.js');

    }
});

server.route({
    method: 'GET',
    path: '/prime.js',
    handler: function (request, reply) {

        reply.file(__dirname + '/prime.js');

    }
});


server.route({
    method: 'GET',
    path: '/draw',
    handler: function (request, reply) {

        reply.file(__dirname + '/draw.html');

    }
});


server.route({
    method: 'GET',
    path: '/draw.js',
    handler: function (request, reply) {

        reply.file(__dirname + '/draw.js');

    }
});


server.route({
    method: 'GET',
    path: '/draw.css',
    handler: function (request, reply) {

        reply.file(__dirname + '/draw.css');

    }
});


// Start the server
server.start();


//Start Primus-ing things
primus.on('error', function error(err) {
  console.error('Something horrible has happened', err, err.message);
});


primus.on('connection', function (spark) {

    connections.push(spark);
    

    //log the array of connection id's every time there's a new one
    for (var i = 0; i < connections.length; i++) {
        console.log(connections[i].id);
    };
    console.log("New connection! There are now " + connections.length + " connections.");

    if (log.length>0) {
        log.map(function (value, index, array) {
            spark.write(value);
        });
        console.log("Log served to " + spark.id);
    } //else{spark.write("No one has drawn yet. Be the first!")};


    spark.on('data', function message (data){

            //if they ask for the log of dots, give it to them
            if (data=='requestLog'){ 
                connections.map(function (value, index, array){
                    connections[index].write(data);
                });
            }
            if (data=='erase') {
                log = [];
                primus.write('erased!');
            };
            //if they want the connections, just give them the list of id's
            /*if (data=='requestConnections'){ 
                console.log("this guy wants the connections");
                for (var i = 0; i < connections.length; i++) {
                    spark.write(connections[i].id);
                };
            } else */if(typeof(data)=='object' && data.id=='dot'){
           
                log.push(data);

                connections.map(function (value, index, array){
                    connections[index].write(data);
                });

                //spark.write(data);
                
           }
        
    });

    
});
                                                                                   
