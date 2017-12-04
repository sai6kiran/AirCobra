var express = require('express')
var app = express()
var http = require('http')
app.use(express.static(__dirname + '/Web_design'));
var bookingnumber = 100

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

var pg = require('pg')
var conString = "postgres://postgres:postgres@localhost:5432/AirCobra"
var client = new pg.Client(conString)
var email = ''
var price = 100000
var duration = '150:00:00'
var airline = ''
var flight = ''
var cl = ''
var size = ''

app.set('view engine', 'ejs');

app.get('/', function(req, response) {
  response.sendFile('Web_design/i.html', {root: __dirname });
});

app.get('/sign_up.html', function(req, response){
  response.sendFile('Web_design/sign_up.html', {root: __dirname });
})

app.get('/wsign_up.html', function(req, response){
  response.sendFile('Web_design/wsign_up.html', {root: __dirname });
})

app.get('/login.html', function(req, response){
  response.sendFile('Web_design/login.html', {root: __dirname });
})

app.get('/wlogin.html', function(req, response){
  response.sendFile('Web_design/wlogin.html', {root: __dirname });
})

app.get('/booking.html', function(req, response){
  response.sendFile('Web_design/booking.html', {root: __dirname });
})

app.get('/ebooking.html', function(req, response){
  response.sendFile('Web_design/ebooking.html', {root: __dirname });
})

app.get('/abooking.html', function(req, response){
  response.sendFile('Web_design/abooking.html', {root: __dirname });
})

app.get('/wbooking.html', function(req, response){
  response.sendFile('Web_design/wbooking.html', {root: __dirname });
})

/*app.get('/update_information.html', function(req, response){
  response.sendFile('Web_design/update_information.html', {root: __dirname });
})

app.get('/wupdate_information.html', function(req, response){
  response.sendFile('Web_design/wupdate_information.html', {root: __dirname });
})*/

app.get('/i.html', function(req, response){
  response.sendFile('Web_design/i.html', {root: __dirname });
})

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
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
        if (typeof(res.rows[0]) != "undefined"){
          email = req.body.email
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
        else{
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
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
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
      }
    })
    response.sendFile('Web_design/abooking.html', {root: __dirname })
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
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
      }
    })
    response.sendFile('Web_design/abooking.html', {root: __dirname })
  })
})

app.post('/book0', function(req, response){
  airline = req.body.ac
  flight = req.body.fn
  size = req.body.c
  if(req.body.cl == 'F')
    cl = 'First'
  else
    cl = 'Economy'
  var result = []
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var credit = parseInt(req.body.credit)
    var tex = 'SELECT (creditcard.creditcardnumber) as a  FROM creditcard WHERE email = $1'
    var values4 = [email]
    client.query(tex, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        for(i = 0; i < res.rows.length; i++){
          result.push({
            cnumber : res.rows[i].a
          })
        }
        console.log(result)
        response.render('pages/purchase',{drinks : result,
                                         airline : airline, 
                                         cl: cl, 
                                         flight : flight})
      }
    })
  })
})

app.post('/bookc', function(req, response){
  var tex = ''
  var text = ''
  var values4 = []
  var values3 = []
  if (size == '3'){
    var nairline = airline.split(',')
    var nflight = flight.split(',')
    if(cl == 'First'){
      text = 'UPDATE flight SET fseat = fseat - 1 WHERE (airlinecode = $1 AND flightnumber = $4) OR (airlinecode = $2 AND flightnumber = $5) OR (airlinecode = $3 AND flightnumber = $6)'
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($9, $4, $1, $7, $12, $8),($10, $5, $2, $7, $12, $8),($11, $6, $3, $7, $12, $8)'
      values4 = [nairline[0],nairline[1],nairline[2],parseInt(nflight[0]),parseInt(nflight[1]),parseInt(nflight[2]),parseInt(req.body.ac),email,bookingnumber,bookingnumber + 1,bookingnumber + 2,cl]
    }
    else{
      text = 'UPDATE flight SET eseat = eseat - 1 WHERE (airlinecode = $1 AND flightnumber = $4) OR (airlinecode = $2 AND flightnumber = $5) OR (airlinecode = $3 AND flightnumber = $6)'
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($9, $4, $1, $7, $12, $8),($10, $5, $2, $7, $12, $8),($11, $6, $3, $7, $12, $8)'
      values4 = [nairline[0],nairline[1],nairline[2],parseInt(nflight[0]),parseInt(nflight[1]),parseInt(nflight[2]),parseInt(req.body.ac),email,bookingnumber,bookingnumber + 1,bookingnumber + 2,cl]
    }
    bookingnumber = bookingnumber + 3
    values3 = [nairline[0],nairline[1],nairline[2],parseInt(nflight[0]),parseInt(nflight[1]),parseInt(nflight[2])]
  }
  else if (size == '2'){
    var nairline = airline.split(',')
    var nflight = flight.split(',')
    if(cl == 'First'){
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($7, $3, $1, $5, $9, $6),($8, $4, $2, $5, $9, $6)'
      text = 'UPDATE flight SET fseat = fseat - 1 WHERE (airlinecode = $1 AND flightnumber = $3) OR (airlinecode = $2 AND flightnumber = $4)'
      values4 = [nairline[0],nairline[1],parseInt(nflight[0]),parseInt(nflight[1]),parseInt(req.body.ac),email,bookingnumber,bookingnumber + 1,cl]
    }
    else{
      text = 'UPDATE flight SET eseat = eseat - 1 WHERE (airlinecode = $1 AND flightnumber = $3) OR (airlinecode = $2 AND flightnumber = $4)'
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($7, $3, $1, $5, $9, $6),($8, $4, $2, $5, $9, $6)'
      values4 = [nairline[0],nairline[1],parseInt(nflight[0]),parseInt(nflight[1]),parseInt(req.body.ac),email,bookingnumber,bookingnumber + 1,bookingnumber + 2,cl]
    }
    bookingnumber = bookingnumber + 2
    values3 = [nairline[0],nairline[1],parseInt(nflight[0]),parseInt(nflight[1])]
  }
  else{
    if(cl == 'First'){
      text = 'UPDATE flight SET fseat = fseat - 1 WHERE (airlinecode = $1 AND flightnumber = $2)'
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($5, $2, $1, $3, $6, $4)'
      values4 = [airline,parseInt(flight),parseInt(req.body.ac),email,bookingnumber,cl]
    }
    else{
      text = 'UPDATE flight SET eseat = eseat - 1 WHERE (airlinecode = $1 AND flightnumber = $2)'
      tex = 'INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES($5, $2, $1, $3, $6, $4)'
      values4 = [airline,parseInt(flight),parseInt(req.body.ac),email,bookingnumber,cl]
    }
    bookingnumber = bookingnumber + 1
    values3 = [airline,parseInt(flight)]
  }
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    client.query(tex, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } 
      console.log('yay')
      done
    })
    client.query(text, values3, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      }
    })
  })
})

app.post('/deletebooking', function(req, response) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    var credit = parseInt(req.body.credit)
    const text5 = 'DELETE FROM booking WHERE email = $1 AND bookingnumber = $2'
    const values5 = [email,parseInt(req.body.bn)]
    client.query(text5, values5, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      }
    })
  })
})

app.get('/manage', function(req, response){
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    const text4 = 'SELECT booking.bookingnumber as b,booking.flightnumber as f,booking.airlinecode as a,booking.creditcardnumber as c,booking.seatclass as s FROM booking WHERE email = $1'
    const values4 = [email]
    client.query(text4, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        response.sendFile('Web_design/abooking.html', {root: __dirname })
        done
      } else{
        console.log(res.rows[0])
        var result = []
        for(i = 0; i < res.rows.length; i++){
          result.push({
            bn : res.rows[i].b,
            fl : res.rows[i].f,
            ac : res.rows[i].a,
            cn : res.rows[i].c,
            se : res.rows[i].s,
          })
        }
        console.log(result)
        response.render('pages/manage',{drinks : result})
      }
    })
  })
})

app.get('/update', function(req, response){
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    var text4 = 'SELECT customer.firstname as f,customer.lastname as l,customer.address as a,customer.hiata as h FROM customer where email = $1'
    var values4 = [email]
    var result2 = []
    var result = []
    var text = 'SELECT (creditcard.creditcardnumber) as cn, (creditcard.paymentaddress) as add FROM creditcard WHERE email = $1'
    client.query(text4, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
        done
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          result.push({
            fn : res.rows[i].f,
            ln : res.rows[i].l,
            hi : res.rows[i].h,
            em : email,
            ad : res.rows[i].a,
          })
        }
        console.log(result)
      }
    })
    client.query(text, values4, (err, res) => {
      if (err) {
        console.log (err.stack)
        response.sendFile('Web_design/wbooking.html', {root: __dirname })
        done
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          result2.push({
            cnumber : res.rows[i].cn,
            pa : res.rows[i].add
          })
        }
        console.log(result)
        response.render('pages/update',{drinks : result, 
          drinks2 : result2})
      }
    })
  })
})

app.post('/booking', function(req, response) {
  var test = 'Economy Class'
  if(req.body.price == "First"){
    test = 'First Class'
  }
  if(req.body.dep != "Preferred Price")
    price = parseFloat(req.body.dep)
  if(req.body.dur != "Time Limit (hours)")
    duration = req.body.dur+':00:00'
  if(req.body.conn == '2'){
    pg.connect(conString, function (err, client, done) { // 2 connections COMEBACK
      if (err) {
        return console.error('could not connect to postgres', err)
        response.sendFile('Web_design/booking.html', {root: __dirname })
      } 
      var tex = ''
      var value = []
      if(req.body.check == "Search Round Trip Flights"){
        var value = [req.body.ddate,req.body.adate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',req.body.adate+ ' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a3.firstclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $3 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $3 and a1.ddate <= a2.date and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a2.ddate <= a3.date and a1.date >= $2 and a1.date < $6) ORDER BY a3.ddate - a1.date asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a3.economyclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $3 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $3 and a1.ddate <= a2.date and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a2.ddate <= a3.date and a1.date >= $2 and a1.date < $6) ORDER BY a3.ddate - a1.date asc'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a3.firstclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $3 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $3 and a1.ddate <= a2.date and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a2.ddate <= a3.date and a1.date >= $2 and a1.date < $6) ORDER BY a3.firstclassprice + a2.firstclassprice + a3.firstclassprice asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a3.economyclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $3 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $3 and a1.ddate <= a2.date and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a2.ddate <= a3.date and a1.date >= $2 and a1.date < $6) ORDER BY a3.economyclassprice + a2.economyclassprice + a3.economyclassprice asc'
        }
      }
      else{
        var value = [req.body.ddate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a3.firstclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $2 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $5 AND (a3.ddate - a1.date) < $6 and a3.diata = $3 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $4) ORDER BY a3.ddate - a1.date asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a3.economyclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $2 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $5 AND (a3.ddate - a1.date) < $6 and a3.diata = $3 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $4) ORDER BY a3.ddate - a1.date asc'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a3.firstclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $2 and (a1.firstclassprice + a2.firstclassprice + a3.firstclassprice) < $5 AND (a3.ddate - a1.date) < $6 and a3.diata = $3 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $4) ORDER BY a3.firstclassprice + a2.firstclassprice + a3.firstclassprice asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a3.economyclassprice as tprice, a3.ddate - a1.date as duration, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i,a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata where (a1.iata = $2 and (a1.economyclassprice + a2.economyclassprice + a3.economyclassprice) < $5 AND (a3.ddate - a1.date) < $6 and a3.diata = $3 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $4) ORDER BY a3.economyclassprice + a2.economyclassprice + a3.economyclassprice asc'
        }
      }
      client.query(tex, value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          price = 100000
          duration = '150:00:00'
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        else{
          if (typeof(res.rows[0]) != "undefined"){
            console.log(res.rows)
            done
            price = 100000
            duration = '150:00:00'
            var result = []
            for(i = 0; i < res.rows.length; i++){
              console.log(res.rows[i])
                result.push({
                duration : res.rows[i].duration.hours + ' hours and '+res.rows[i].duration.minutes+ ' minutes',
                tprice : '$'+res.rows[i].tprice,
                class : test,
                ac1 : res.rows[i].a1a,
                fn1 : res.rows[i].a1f,
                iata1 : res.rows[i].a1i,
                diata1 : res.rows[i].a1d,
                dtime1 : ((res.rows[i].a1dt).toString()).substring(0,24),
                atime1 : ((res.rows[i].a1ddt).toString()).substring(0,24),
                seat1 : res.rows[i].a1s,
                price1 : res.rows[i].a1p,
                ac2 : res.rows[i].a2a,
                fn2 : res.rows[i].a2f,
                iata2 : res.rows[i].a2i,
                diata2 : res.rows[i].a2d,
                dtime2 : ((res.rows[i].a2dt).toString()).substring(0,24),
                atime2 : ((res.rows[i].a2ddt).toString()).substring(0,24),
                seat2 : res.rows[i].a2s,
                price2 : res.rows[i].a2p,
                ac3 : res.rows[i].a3a,
                fn3 : res.rows[i].a3f,
                iata3 : res.rows[i].a3i,
                diata3 : res.rows[i].a3d,
                dtime3 : ((res.rows[i].a3dt).toString()).substring(0,24),
                atime3 : ((res.rows[i].a3ddt).toString()).substring(0,24),
                seat3 : res.rows[i].a3s,
                price3 : res.rows[i].a3p
              })
            }
            response.render('pages/booking2',{drinks : result})
          }
          else{
            console.log('empty')
            done
            price = 100000
            duration = '150:00:00'
            response.sendFile('Web_design/ebooking.html', {root: __dirname })
          }
        }
      })
    })
  }
  else if(req.body.conn == '1'){
    pg.connect(conString, function (err, client, done) { // 1 Connection
      if (err) {
        return console.error('could not connect to postgres', err)
        response.sendFile('Web_design/booking.html', {root: __dirname })
      } 
      var tex = ''
      var value = []
      if(req.body.check == "Search Round Trip Flights"){ 
        var value = [req.body.ddate,req.body.adate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',req.body.adate+ ' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'select a2.firstclassprice + a1.firstclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight join natural price) AS a2 on a1.diata = a2.iata where (a1.iata = $3 and a2.diata = $4 and (a1.firstclassprice + a2.firstclassprice) < $7 AND (a2.ddate - a1.date) < $8 AND a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and a2.diata = $3 and (a1.firstclassprice + a2.firstclassprice) < $7 AND (a2.ddate - a1.date) < $8 and a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $2 AND a1.date < $6) ORDER BY a2.ddate - a1.date ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $3 and a2.diata = $4 and (a1.economyclassprice + a2.economyclassprice) < $7 AND (a2.ddate - a1.date) < $8  and a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and (a1.economyclassprice + a2.economyclassprice) < $7 AND (a2.ddate - a1.date) < $8  and a2.diata = $3 and a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $2 AND a1.date < $6) ORDER BY a2.ddate - a1.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a2.firstclassprice + a1.firstclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $3 and a2.diata = $4 and a1.ddate < a2.date and a2.fseat > 0 and (a1.firstclassprice + a2.firstclassprice) < $7 AND (a2.ddate - a1.date) < $8  and a1.fseat > 0 and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and a2.diata = $3 and a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and (a1.firstclassprice + a2.firstclassprice) < $7 AND (a2.ddate - a1.date) < $8  and a1.date >= $2 AND a1.date < $6) ORDER BY a2.firstclassprice + a1.firstclassprice ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $3 and a2.diata = $4 and a1.ddate < a2.date and a2.eseat > 0 and (a1.economyclassprice + a2.economyclassprice) < $7 AND (a2.ddate - a1.date) < $8 and a1.eseat > 0 and a1.date >= $1 and a1.date < $5) OR (a1.iata = $4 and a2.diata = $3 and (a1.economyclassprice + a2.economyclassprice) < $7 AND (a2.ddate - a1.date) < $8  and a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $2 AND a1.date < $6) ORDER BY a2.economyclassprice + a1.economyclassprice ASC'
        }
      }
      else{
        var value = [req.body.ddate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'select a2.firstclassprice + a1.firstclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $2 and (a1.firstclassprice + a2.firstclassprice) < $5 AND (a2.ddate - a1.date) < $6  and a2.diata = $3 and a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $1 and a1.date < $4) ORDER BY a2.ddate - a1.date ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $2 and (a1.economyclassprice + a2.economyclassprice) < $5 AND (a2.ddate - a1.date) < $6 and a2.diata = $3 and a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $1 and a1.date < $4) ORDER BY a2.ddate - a1.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a2.firstclassprice + a1.firstclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber) as a1 join (flight join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber) AS a2 on a1.diata = a2.iata where (a1.iata = $2 and (a1.firstclassprice + a2.firstclassprice) < $5 AND (a2.ddate - a1.date) < $6 and a2.diata = $3 and a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $1 and a1.date < $4) ORDER BY a2.firstclassprice + a1.firstclassprice ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice AS tprice, a2.ddate - a1.date AS duration,a1.iata as a1i,a2.iata as a2i,a1.diata as a1d,a2.diata as a2d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a,a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a1.ddate as a1ddt,a2.ddate as a2ddt from (flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata where (a1.iata = $2 and (a1.economyclassprice + a2.economyclassprice) < $5 AND (a2.ddate - a1.date) < $6 and a2.diata = $3 and a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $1 and a1.date < $4) ORDER BY a2.economyclassprice + a1.economyclassprice ASC'
        }
      }
      client.query(tex, value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          price = 100000
          duration = '150:00:00'
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        else{
          if (typeof(res.rows[0]) != "undefined"){
            console.log(res.rows)
            done
            price = 100000
            duration = '150:00:00'
            var result = []
            for(i = 0; i < res.rows.length; i++){
              console.log(res.rows[i])
                result.push({
                duration : res.rows[i].duration.hours + ' hours and '+res.rows[i].duration.minutes+ ' minutes',
                tprice : '$'+res.rows[i].tprice,
                class : test,
                ac1 : res.rows[i].a1a,
                fn1 : res.rows[i].a1f,
                iata1 : res.rows[i].a1i,
                diata1 : res.rows[i].a1d,
                dtime1 : ((res.rows[i].a1dt).toString()).substring(0,24),
                atime1 : ((res.rows[i].a1ddt).toString()).substring(0,24),
                seat1 : res.rows[i].a1s,
                price1 : res.rows[i].a1p,
                ac2 : res.rows[i].a2a,
                fn2 : res.rows[i].a2f,
                iata2 : res.rows[i].a2i,
                diata2 : res.rows[i].a2d,
                dtime2 : ((res.rows[i].a2dt).toString()).substring(0,24),
                atime2 : ((res.rows[i].a2ddt).toString()).substring(0,24),
                seat2 : res.rows[i].a2s,
                price2 : res.rows[i].a2p
              })
            }
            response.render('pages/booking1',{drinks : result})
          }
          else{
            console.log('empty')
            done
            price = 100000
            duration = '150:00:00'
            response.sendFile('Web_design/wbooking.html', {root: __dirname })
          }
        }
      })
    })
  }
  else{
    pg.connect(conString, function (err, client, done) {  // O connections
      if (err) {
        return console.error('could not connect to postgres', err)
        response.sendFile('Web_design/booking.html', {root: __dirname })
      } 
      var tex = ''
      var value = []
      if(req.body.check == "Search Round Trip Flights"){
        var value = [req.body.ddate,req.body.adate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',req.body.adate+ ' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE ( (flight.date >= $1  AND flight.date < $5 AND price.firstclassprice < $7 AND (flight.ddate - flight.date) < $8 AND flight.iata = $3 AND flight.diata = $4 AND flight.fseat > 0) OR (flight.date >= $2 AND (flight.ddate - flight.date) < $8 AND flight.date < $6 AND price.firstclassprice < $7 AND flight.iata = $4 AND flight.diata = $3 AND flight.fseat > 0)) ORDER BY flight.ddate - flight.date ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE ( (flight.date >= $1 AND (flight.ddate - flight.date) < $8 AND flight.date < $5 AND flight.iata = $3 AND price.economyclassprice < $7 AND flight.diata = $4 AND flight.eseat > 0) OR (flight.date >= $2 AND (flight.ddate - flight.date) < $8 AND flight.date < $6 AND price.economyclassprice < $7 AND flight.iata = $4 AND flight.diata = $3 AND flight.eseat > 0)) ORDER BY flight.ddate - flight.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE ( (flight.date >= $1 AND (flight.ddate - flight.date) < $8 AND flight.date < $5 AND price.firstclassprice < $7 AND flight.iata = $3 AND flight.diata = $4 AND flight.fseat > 0) OR (flight.date >= $2 AND (flight.ddate - flight.date) < $8 AND price.firstclassprice < $7 AND flight.date < $6 AND flight.iata = $4 AND flight.diata = $3 AND flight.fseat > 0)) ORDER BY price.firstclassprice  ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE ( (flight.date >= $1 AND flight.date < $5 AND flight.iata = $3 AND price.economyclassprice < $7 AND (flight.ddate - flight.date) < $8 AND flight.diata = $4 AND flight.eseat > 0) OR (flight.date >= $2 AND flight.date < $6 AND (flight.ddate - flight.date) < $8 AND flight.iata = $4 AND price.economyclassprice < $7 AND flight.diata = $3 AND flight.eseat > 0)) ORDER BY price.economyclassprice ASC'
        }
      }
      else{
        var value = [req.body.ddate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.firstclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.fseat > 0) ORDER BY flight.ddate - flight.date ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.economyclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.eseat > 0) ORDER BY flight.ddate - flight.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.firstclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.fseat > 0) ORDER BY price.firstclassprice  ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.economyclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.eseat > 0) ORDER BY price.economyclassprice ASC'
        }
      }
      client.query(tex, value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          price = 100000
          duration = '150:00:00'
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        else{
          if (typeof(res.rows[0]) != "undefined"){
            done
            price = 100000
            duration = '150:00:00'
            var result = []
            for(i = 0; i < res.rows.length; i++){
              result.push({
                duration : res.rows[i].duration.hours + ' hours and '+res.rows[i].duration.minutes+ ' minutes',
                tprice : '$'+res.rows[i].tprice,
                class : test,
                ac : res.rows[i].airlinecode,
                fn : res.rows[i].flightnumber,
                iata : res.rows[i].iata,
                diata : res.rows[i].diata,
                dtime : ((res.rows[i].date).toString()).substring(0,24),
                atime : ((res.rows[i].ddate).toString()).substring(0,24),
                seat : res.rows[i].fseat
              })
            }
            console.log(result)
            response.render('pages/booking',{drinks : result})
          }
          else{
            console.log('empty O connections')
            done
            price = 100000
            duration = '150:00:00'
            response.sendFile('Web_design/ebooking.html', {root: __dirname })
          }
        }
      })
    })
  }
})

  
app.listen(8080, function(){
console.log('Server running at http://127.0.0.1:8080/');
})