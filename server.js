var Hapi = require('hapi');

// Create a server with a host and port
var server = Hapi.createServer('0.0.0.0', 8000, {cors:true, files: {relativeTo: 'routes'}});

//Hello world test route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function () {

        this.reply('hello world');
    }
});

//Draw page route
server.route({
    method: 'GET',
    path: '/draw',
    handler: function (request, response) {

        var response = new Hapi.response.File('./draw.html');
        this.reply(response);

    }
});

//Home Page route
server.route({
    method: 'GET',
    path: '/home',
    handler: function (request, response) {

        var response = new Hapi.response.File('./home.html');
        this.reply(response);

    }
});

server.route({
    method: 'GET',
    path: '/draw.js',
    handler: function (request, response) {

        var response = new Hapi.response.File('./draw.js');
        this.reply(response);

    }
});

server.route({
    method: 'GET',
    path: '/draw.css',
    handler: function (request, response) {

        var response = new Hapi.response.File('./draw.css');
        this.reply(response);

    }
});

// Start the server
server.start();
