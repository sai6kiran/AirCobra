var express = require('express')
var app     = express()
var http = require('http')
var flag = -1
var q = require('q')
app.use(express.static(__dirname + '/Web_design'));

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var pg = require('pg')
var conString = "postgres://postgres:postgres@localhost:5432/AirCobra"
var client = new pg.Client(conString)
var email = ''

app.get('/sign_up.html', function(req, response){
  response.sendFile('Web_design/sign_up.html', {root: __dirname });
});

app.get('/wsign_up.html', function(req, response){
  response.sendFile('Web_design/wsign_up.html', {root: __dirname });
});

app.get('/login.html', function(req, response){
  response.sendFile('Web_design/login.html', {root: __dirname });
});

app.get('/wlogin.html', function(req, response){
  response.sendFile('Web_design/wlogin.html', {root: __dirname });
});

app.get('/booking.html', function(req, response){
  response.sendFile('Web_design/booking.html', {root: __dirname });
});

app.get('/update_information.html', function(req, response){
  response.sendFile('Web_design/update_information.html', {root: __dirname });
});

app.get('/wupdate_information.html', function(req, response){
  response.sendFile('Web_design/wupdate_information.html', {root: __dirname });
});

app.get('/i.html', function(req, response){
  response.sendFile('Web_design/i.html', {root: __dirname });
});

app.post('/login', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var credit = parseInt(req.body.credit);
    const tex = 'SELECT FROM customer WHERE email = $1 AND firstname = $2'
    const value = [req.body.email,req.body.fname]
    client.query(tex, value, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/login.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
        if (typeof(res.rows[0]) != "undefined"){
          email = req.body.email
          response.sendFile('Web_design/booking.html', {root: __dirname })
        }
        else{
          response.sendFile('Web_design/wlogin.html', {root: __dirname })
        }
      }
    })
  })
})

app.post('/myaction', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var credit = parseInt(req.body.credit);
    const tex = 'INSERT INTO customer (firstname,lastname,email,address,hiata) VALUES($1, $2, $3, $4, $5) RETURNING *'
    const value = [req.body.fname,req.body.lname,req.body.email,req.body.add,req.body.hiata]
    email = req.body.email
    client.query(tex, value, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wsign_up.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
        if (typeof(res.rows[0]) != "undefined"){
          email = req.body.email
          response.sendFile('Web_design/booking.html', {root: __dirname })
        }
        else{
          response.sendFile('Web_design/wsign_up.html', {root: __dirname })
        }
      }
    })
  })
})

app.post('/updateInfo', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    const text = "UPDATE customer SET firstname = $1, lastname = $2, address = $3, email = $4, hiata = $5 WHERE email = $6 RETURNING *"
    const values = [req.body.fname,req.body.lname,req.body.add,req.body.email,req.body.hiata,email]
    client.query(text, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wupdate_information.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
        if (typeof(res.rows[0]) != "undefined"){
          email = req.body.email
          response.sendFile('Web_design/update_information.html', {root: __dirname })
        }
        else{
          response.sendFile('Web_design/wupdate_information.html', {root: __dirname })
        }   
      }
    })
  })
})
  
app.post('/deleteCredit', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var credit = parseInt(req.body.credit)
    const text5 = 'DELETE FROM creditcard WHERE email = $3 AND (creditcardnumber = $1 OR paymentaddress = $2) RETURNING *'
    const values5 = [credit,req.body.dbadd,email]
    client.query(text5, values5, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
      } else{
        console.log(res.rows[0])
        done
      }
    })
    response.sendFile('Web_design/update_information.html', {root: __dirname })
  })
})

app.post('/addCredit', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var credit = parseInt(req.body.credit)
    const text4 = 'INSERT INTO creditcard (email,creditcardnumber,paymentaddress) VALUES($1, $2, $3) RETURNING *'
    const values4 = [email,credit,req.body.badd]
    client.query(text4, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
      } else{
        console.log(res.rows[0])
        done
      }
    })
    response.sendFile('Web_design/update_information.html', {root: __dirname })
  })
})
  app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});