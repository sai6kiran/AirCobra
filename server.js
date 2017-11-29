var express = require('express');
var app     = express();
var http = require('http');
var flag = -1;
var q = require('q');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require('pg');
var conString = "postgres://postgres:postgres@localhost:5432/AirCobra";
var client = new pg.Client(conString);

app.post('/myaction', function(req, response) {
  client.connect();
  var credit = parseInt(req.body.credit);
  const text = 'INSERT INTO customer (firstname,lastname,email,address,creditcardnumber,hiata) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [req.body.fname,req.body.lname,req.body.email,req.body.add,credit,req.body.hiata];
  email = req.body.email;
  client.query(text, values, (err, res) => {
    if (err) {
      console.log (err.stack)
    } else{
      console.log(res.rows[0])
    }
  });
  const text2 = 'INSERT INTO creditcard (email,creditcardnumber,paymentaddress) VALUES($1, $2, $3) RETURNING *';
  const values2 = [req.body.email,credit,req.body.add];
  client.query(text2, values2, (err, res) => {
    if (err) {
      console.log (err.stack)
    } else{
      console.log(res.rows[0]);
      client.end();
      response.sendFile('Web_design/update_information.html', {root: __dirname });
    }
  });
});


app.get('/youraction', function(req, res){
  client.connect();
  var query = client.query("SELECT email,firstname FROM customer WHERE customer.email = 'saikiran@hawk.iit.edu' AND customer.firstname = 'Sai'", function(err, res) {
      if(err) console.log(err);
      else console.log("Logged In");
  });
  client.end();
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