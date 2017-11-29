var express = require('express');
var app     = express();
var http = require('http');
var flag = -1;
var q = require('q');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require('pg');
var conString = "postgres://postgres:4jw3np4h@localhost:5432/425Project";

/*
client.connect();

const text = 'INSERT INTO customer (firstname,lastname,email,address,creditcardnumber,hiata) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
const values = ['John','Smith','example2@mail.com','Fake Address',1234568,'ORD'];
client.query(text, values, (err, res) => {
  if (err) {
    console.log (err.stack)
    flag = 0
    client.end()
  } else{
    console.log(res.rows[0])
    flag = 1
    client.end()
  }
});*/

app.post('/myaction', function(req, res) {
    client.connect();
    var credit = parseInt(req.body.credit);
    const text = 'INSERT INTO customer (firstname,lastname,email,address,creditcardnumber,hiata) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [req.body.fname,req.body.lname,req.body.email,req.body.add,credit,req.body.hiata];
    client.query(text, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        flag = 0
      } else{
        console.log(res.rows[0])
        flag = 1
      }
    });
    const text2 = 'INSERT INTO creditcard (email,creditcardnumber,paymentaddress) VALUES($1, $2, $3) RETURNING *';
    const values2 = [req.body.email,credit,req.body.add];
    client.query(text2, values2, (err, res) => {
      if (err) {
        console.log (err.stack)
        flag = 0
      } else{
        console.log(res.rows[0])
        flag = 1
      }
    });
    if(flag > -1){
      clientExit()
      //res.redirect('public/update_information')
      res.end()
    }
});


app.get('/youraction', function(req, res){
  runSQL("SELECT email,firstname FROM customer WHERE customer.email = '"+req.body.email+"' AND customer.firstname = '"+req.body.fname+"'").then(function(err, res) {
    if(err){
      console.log("there was an error");
    }
    else 
      console.log(res);
  }); 
});

/*var constring = 'postgres://postgres:4jw3np4h@localhost:8888/mydb';
pg.connect(conString, function(err, client) {
    // Use the client to do things here
  });
    client.query("INSERT INTO table(a,b,c,d) value('a','b','c','d')");

var query = client.query("SELECT * FROM table");*/
    app.listen(8080, function() {
    console.log('Server running at http://127.0.0.1:8080/');
  });

  
function runSQL (sqlStatement) {
  var deferred = q.defer(); 
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(conString, function(err, client, done) {


      // SQL Query > Select Data
      var query = client.query(sqlStatement, function(err, res) {
          if(err) console.log(err);
          deferred.resolve(res);
      });


      // After all data is returned, close connection and return results
      query.on('end', function() {
          client.end();
          deferred.resolve(results);
      });

      // Handle Errors
      if(err) {
        console.log(err);
      }

  });

  return deferred.promise;
};

