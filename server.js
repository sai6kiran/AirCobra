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
  console.log("IM HERE");
  client.connect();
  text = "SELECT email,firstname FROM customer WHERE customer.email = $1 AND customer.firstname = $2";
  values = ['test1@test.com','dingu'];
  client.query(text, values, (err, res) => {
    if (err) {
      console.log (err.stack);
    } else{
      console.log(res.rows[1]);
    }
  });
  /*var query = client.query("SELECT email,firstname FROM customer WHERE customer.email = 'test1@test.com' AND customer.firstname = 'dingus'")
  query.on("row", function(row, result) {
      result.addRow(row);
  });
  console.log("IM HERE");
  query.on("end", function(result) {
    var a = JSON.stringify(result.rows, null, "   ");
    if(a[1] == ']')
      console.log("Not there");
    else 
      console.log(a);
    client.end();
  });*/
});
    app.listen(8080, function() {
    console.log('Server running at http://127.0.0.1:8080/');
  });