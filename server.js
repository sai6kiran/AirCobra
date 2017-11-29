var http = require('http');
var express = require("express");
var pg = require('pg');
var app = express();
var constring = 'postgres://postgres:4jw3np4h@localhost:8888/mydb'
var pg = require('pg');
var conString = "postgres://YourUserName:YourPassword@localhost:5432/YourDatabase";

var client = new pg.Client(conString);


http.createServer(function (request, response) {
   response.writeHead(200, {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin' : '*'
    });
    response.end('Hello World\n');
}).listen(8080);

app.post('/myaction', function(req, res) {
    client.connect();
    console.log("IM HERE");
    client.query("INSERT INTO customer(firstname,lastname,email,address,creditcardnumber,hiata) value($1,$2,$3,$4,$5,$6)"
    ,[req.fname, req.lname, req.email, req.add, /*parse into integer*/req.credit, req.hiata]);
});
/*
app.get('/youraction', function(req, res){
    client.connect();
    client.query("SELECT FROM ")
})*/
    


/*var constring = 'postgres://postgres:4jw3np4h@localhost:8888/mydb';
pg.connect(conString, function(err, client) {
    // Use the client to do things here
  });
    client.query("INSERT INTO table(a,b,c,d) value('a','b','c','d')");

var query = client.query("SELECT * FROM table");*/
