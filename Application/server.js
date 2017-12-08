var express = require('express')
var app = express()
var http = require('http')
app.use(express.static(__dirname + '/Web_design'));
var bookingnumber = 1000

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

//EXPRESS JAVASCRIPT

app.set('view engine', 'ejs');

//GET

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

app.get('/i.html', function(req, response){
  response.sendFile('Web_design/i.html', {root: __dirname });
})

app.get('/admin', function(req, response){
  var customer = []
  var creditcard = []
  var flight = []
  var airline = []
  var airport = []
  var price = []
  var booking = []
  var values = []
  var text1 = "SELECT * FROM customer"
  var text2 = "SELECT * FROM creditcard"
  var text3 = "SELECT * FROM flight"
  var text4 = "SELECT * FROM airport"
  var text5 = "SELECT * FROM airline"
  var text6 = "SELECT * FROM booking"
  var text7 = "SELECT * FROM price"
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    client.query(text1, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          customer.push({
            fn : res.rows[i].firstname,
            ln : res.rows[i].lastname,
            em : res.rows[i].email,
            ad : res.rows[i].address,
            hi : res.rows[i].hiata,
          })
        }
      }
    })
    client.query(text2, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          creditcard.push({
            cn : res.rows[i].creditcardnumber,
            pa : res.rows[i].paymentaddress,
            em : res.rows[i].email,
          })
        }
      }
    })
    client.query(text3, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          flight.push({
            ac : res.rows[i].airlinecode,
            fn : res.rows[i].flightnumber,
            ia : res.rows[i].iata,
            dt : res.rows[i].date,
            di : res.rows[i].diata,
           ddt : res.rows[i].ddate,
            fs : res.rows[i].fseat,
            es : res.rows[i].eseat
          })
        }
      }
    })
    client.query(text4, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          airport.push({
            co : res.rows[i].country,
            ia : res.rows[i].iata,
            st : res.rows[i].state,
            ap : res.rows[i].apname
          })
        }
      }
    })
    client.query(text5, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          airline.push({
            ai : res.rows[i].airlinecode,
            ia : res.rows[i].iata,
            fn : res.rows[i].fullname,
            co : res.rows[i].country_of_origin
          })
        }
      }
    })
    client.query(text6, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          booking.push({
            bo : res.rows[i].bookingnumber,
            fl : res.rows[i].flightnumber,
            ai : res.rows[i].airlinecode,
            cn : res.rows[i].creditcardnumber,
            se : res.rows[i].seatclass,
            em : res.rows[i].email
          })
        }
      }
    })
    client.query(text7, values, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
        response.sendFile('Web_design/abooking.html', {root: __dirname })
      } else{
        console.log(res.rows[0])
        for(i = 0; i < res.rows.length; i++){
          price.push({
            ac : res.rows[i].airlinecode,
            fn : res.rows[i].flightnumber,
            fp : res.rows[i].firstclassprice,
            ep : res.rows[i].economyclassprice
          })
        }
        done
        response.render('pages/admin',{cust : customer,
                                        book : booking,
                                        cred : creditcard,
                                       price : price,
                                        airl : airline,
                                        airp : airport,
                                      flight : flight })
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

//POST

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
  var temp2 = req.body.ac
  var temp = temp2.split('.')
  airline = temp[1].toString()
  flight = temp[0].toString()
  temp3 = airline.split(',')
  temp4 = flight.split(',')
  size = req.body.c
  if(req.body.cl == 'First')
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
        var flights = []
        for(j = 0;j < temp3.length;j++){
          flights.push({
            ac : temp3[j],
            fn : temp4[j]
          })
        }
        console.log(result)
        response.render('pages/purchase',{drinks : result,
                                         fly : flights, 
                                         cl: cl})
      }
    })
  })
})

app.post('/bookc', function(req, response){
  var text = []
  var text2 = []
  var value = []
  var nairline = airline.split(',')
  var nflight = flight.split(',')
  var seat = 'eseat'
  if(cl == 'First')
    seat = 'fseat'
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    for(var i = 0; i < nairline.length; i++){
        text.push('UPDATE flight SET '+seat+' = '+seat+' - 1 WHERE (airlinecode = \''+nairline[0]+'\' AND flightnumber = '+parseInt(nflight[0])+')')
        text2.push('INSERT INTO booking (bookingnumber,flightnumber,airlinecode,creditcardnumber,seatclass,email) VALUES('+bookingnumber+','+parseInt(nflight[i])+',\''+nairline[i]+'\','+parseInt(req.body.ac)+',\''+cl+'\',\''+email+'\')')
        console.log(text[i])
        console.log(text2[i])
    }
    if(nairline.length == 1){
      client.query(text[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
          bookingnumber++
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
      })
    }
    if(nairline.length == 2){
      client.query(text[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
        })
      client.query(text2[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
          bookingnumber++
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
      })
    }
    if(nairline.length == 3){
      client.query(text[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
        })
      client.query(text2[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
          bookingnumber++
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
      })
    }
    if(nairline.length == 4){
      client.query(text[3], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[3], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
        })
      client.query(text2[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
          bookingnumber++
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
      })
    }
    if(nairline.length == 6){
      client.query(text[5], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[5], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[4], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[4], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[3], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[3], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[2], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
      })
      client.query(text2[1], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
        }
      })
      client.query(text[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } 
        console.log('yay')
        done
        })
      client.query(text2[0], value, (err, res) => {
        if (err) {
          console.log (err.stack)
          done
          response.sendFile('Web_design/wbooking.html', {root: __dirname })
        } else{
          done
          bookingnumber++
          response.sendFile('Web_design/abooking.html', {root: __dirname })
        }
      })
    }
  })
})

app.post('/deletebooking', function(req, response) {
  var temp = ((req.body.bn).toString()).split(',')
  var seat = 'eseat'
  if(temp[3]=='First')
    seat = 'fseat'
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    }
    var credit = parseInt(req.body.credit)
    const text5 = 'DELETE FROM booking WHERE email = $1 AND bookingnumber = $2'
    const values5 = [email,parseInt(temp[0])]
    var text = 'UPDATE FLIGHT SET '+seat+' = '+seat+' + 1 WHERE flightnumber = '+parseInt(temp[2])+' AND airlinecode = \''+temp[1]+'\''
    var value = []
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
    client.query(text, value, (err, res) => {
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

app.post('/booking', function(req, response) {
  var days = 0
  var hours = 0
  var minutes = 0
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
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a1.firstclassprice + a4.firstclassprice + a5.firstclassprice + a6.firstclassprice as tprice, ((a6.ddate - a4.date) + (a3.ddate - a1.date)) as duration, a4.iata as a4i, a5.iata as a5i, a6.iata as a6i, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i, a4.diata as a4d, a5.diata as a5d, a6.diata as a6d, a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p,a4.firstclassprice as a4p,a6.firstclassprice as a6p,a5.firstclassprice as a5p, a1.fseat as a1s,a2.fseat as a2s,a3.fseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a,a4.fseat as a4s,a5.fseat as a5s,a6.fseat as a6s,a4.airlinecode as a4a,a5.airlinecode as a5a,a6.airlinecode as a6a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a4.flightnumber as a4f, a5.flightnumber as a5f,a6.flightnumber as a6f,a4.date as a4dt,a5.date as a5dt,a6.date as a6dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt, a4.ddate as a4ddt, a5.ddate as a5ddt,a6.ddate as a6ddt from ((flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata) cross join ((flight natural Join price) as a4 join (flight natural Join price) as a5 on a4.diata = a5.iata join (flight natural Join price) as a6 on a5.diata = a6.iata) where (a1.iata = $3 and (a3.firstclassprice + a2.firstclassprice + a1.firstclassprice + a4.firstclassprice + a5.firstclassprice + a6.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) AND (a4.iata = $4  AND  a6.diata = $3 and a4.ddate <= a5.date and a4.fseat > 0 and a5.fseat > 0 and a6.fseat > 0 and a5.ddate <= a6.date and a4.date >= $2 and a4.date < $6) ORDER BY ((a6.ddate - a4.date) + (a3.ddate - a1.date)) asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a1.economyclassprice + a4.economyclassprice + a5.economyclassprice + a6.economyclassprice as tprice, ((a6.ddate - a4.date) + (a3.ddate - a1.date)) as duration, a4.iata as a4i, a5.iata as a5i, a6.iata as a6i, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i, a4.diata as a4d, a5.diata as a5d, a6.diata as a6d, a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p,a4.economyclassprice as a4p,a6.economyclassprice as a6p,a5.economyclassprice as a5p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a,a4.eseat as a4s,a5.eseat as a5s,a6.eseat as a6s,a4.airlinecode as a4a,a5.airlinecode as a5a,a6.airlinecode as a6a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a4.flightnumber as a4f, a5.flightnumber as a5f,a6.flightnumber as a6f,a4.date as a4dt,a5.date as a5dt,a6.date as a6dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt, a4.ddate as a4ddt, a5.ddate as a5ddt,a6.ddate as a6ddt from ((flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata) cross join ((flight natural Join price) as a4 join (flight natural Join price) as a5 on a4.diata = a5.iata join (flight natural Join price) as a6 on a5.diata = a6.iata) where (a1.iata = $3 and (a3.economyclassprice + a2.economyclassprice + a1.economyclassprice + a4.economyclassprice + a5.economyclassprice + a6.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) AND (a4.iata = $4 AND  a6.diata = $3 and a4.ddate <= a5.date and a4.eseat > 0 and a5.eseat > 0 and a6.eseat > 0 and a5.ddate <= a6.date and a4.date >= $2 and a4.date < $6) ORDER BY ((a6.ddate - a4.date) + (a3.ddate - a1.date)) asc'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a3.firstclassprice + a2.firstclassprice + a1.firstclassprice + a4.firstclassprice + a5.firstclassprice + a6.firstclassprice as tprice, ((a6.ddate - a4.date) + (a3.ddate - a1.date)) as duration, a4.iata as a4i, a5.iata as a5i, a6.iata as a6i, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i, a4.diata as a4d, a5.diata as a5d, a6.diata as a6d, a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.firstclassprice as a3p,a4.firstclassprice as a4p,a6.firstclassprice as a6p,a5.firstclassprice as a5p, a1.fseat as a1s,a2.fseat as a2s,a3.fseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a,a4.fseat as a4s,a5.fseat as a5s,a6.fseat as a6s,a4.airlinecode as a4a,a5.airlinecode as a5a,a6.airlinecode as a6a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a4.flightnumber as a4f, a5.flightnumber as a5f,a6.flightnumber as a6f,a4.date as a4dt,a5.date as a5dt,a6.date as a6dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt, a4.ddate as a4ddt, a5.ddate as a5ddt,a6.ddate as a6ddt from ((flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata) cross join ((flight natural Join price) as a4 join (flight natural Join price) as a5 on a4.diata = a5.iata join (flight natural Join price) as a6 on a5.diata = a6.iata) where (a1.iata = $3 and (a3.firstclassprice + a2.firstclassprice + a1.firstclassprice + a4.firstclassprice + a5.firstclassprice + a6.firstclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.fseat > 0 and a2.fseat > 0 and a3.fseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) AND (a4.iata = $4 AND  a6.diata = $3 and a4.ddate <= a5.date and a4.fseat > 0 and a5.fseat > 0 and a6.fseat > 0 and a5.ddate <= a6.date and a4.date >= $2 and a4.date < $6) ORDER BY (a3.firstclassprice + a2.firstclassprice + a1.firstclassprice + a4.firstclassprice + a5.firstclassprice + a6.firstclassprice) asc'
          else
            var tex = 'select a3.economyclassprice + a2.economyclassprice + a1.economyclassprice + a4.economyclassprice + a5.economyclassprice + a6.economyclassprice as tprice, ((a6.ddate - a4.date) + (a3.ddate - a1.date)) as duration, a4.iata as a4i, a5.iata as a5i, a6.iata as a6i, a1.iata as a1i,a2.iata as a2i,a3.iata as a3i, a4.diata as a4d, a5.diata as a5d, a6.diata as a6d, a1.diata as a1d,a2.diata as a2d,a3.diata as a3d,a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.economyclassprice as a3p,a4.economyclassprice as a4p,a6.economyclassprice as a6p,a5.economyclassprice as a5p, a1.eseat as a1s,a2.eseat as a2s,a3.eseat as a3s,a1.airlinecode as a1a,a2.airlinecode as a2a,a3.airlinecode as a3a,a4.eseat as a4s,a5.eseat as a5s,a6.eseat as a6s,a4.airlinecode as a4a,a5.airlinecode as a5a,a6.airlinecode as a6a, a3.flightnumber as a3f, a1.flightnumber as a1f,a2.flightnumber as a2f,a1.date as a1dt,a2.date as a2dt,a3.date as a3dt, a4.flightnumber as a4f, a5.flightnumber as a5f,a6.flightnumber as a6f,a4.date as a4dt,a5.date as a5dt,a6.date as a6dt, a3.ddate as a3ddt, a1.ddate as a1ddt,a2.ddate as a2ddt, a4.ddate as a4ddt, a5.ddate as a5ddt,a6.ddate as a6ddt from ((flight natural Join price) as a1 join (flight natural Join price) as a2 on a1.diata = a2.iata join (flight natural Join price) as a3 on a2.diata = a3.iata) cross join ((flight natural Join price) as a4 join (flight natural Join price) as a5 on a4.diata = a5.iata join (flight natural Join price) as a6 on a5.diata = a6.iata) where (a1.iata = $3 and (a3.economyclassprice + a2.economyclassprice + a1.economyclassprice + a4.economyclassprice + a5.economyclassprice + a6.economyclassprice) < $7 AND (a3.ddate - a1.date) < $8 and a3.diata = $4 and a1.eseat > 0 and a2.eseat > 0 and a3.eseat > 0 and a1.ddate <= a2.date and a2.ddate <= a3.date and a1.date >= $1 and a1.date < $5) AND (a4.iata = $4  AND  a6.diata = $3 and a4.ddate <= a5.date and a4.eseat > 0 and a5.eseat > 0 and a6.eseat > 0 and a5.ddate <= a6.date and a4.date >= $2 and a4.date < $6) ORDER BY (a3.economyclassprice + a2.economyclassprice + a1.economyclassprice + a4.economyclassprice + a5.economyclassprice + a6.economyclassprice) asc'
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
                hours = 0
                days = 0
                minutes = 0
                if(typeof (res.rows[i].duration.hours) != "undefined"){
                  hours = res.rows[i].duration.hours
                }
                if(typeof (res.rows[i].duration.days) != "undefined"){
                  days = res.rows[i].duration.days
                }
                if(typeof(res.rows[i].duration.minutes) != "undefined"){
                  minutes = res.rows[i].duration.minutes
                }
                console.log(res.rows[i])
                  result.push({
                  duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
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
                  price3 : res.rows[i].a3p,
                  ac4 : res.rows[i].a4a,
                  fn4 : res.rows[i].a4f,
                  iata4 : res.rows[i].a4i,
                  diata4 : res.rows[i].a4d,
                  dtime4 : ((res.rows[i].a4dt).toString()).substring(0,24),
                  atime4 : ((res.rows[i].a4ddt).toString()).substring(0,24),
                  seat4 : res.rows[i].a4s,
                  price4 : res.rows[i].a4p,
                  ac5 : res.rows[i].a5a,
                  fn5 : res.rows[i].a5f,
                  iata5 : res.rows[i].a5i,
                  diata5 : res.rows[i].a5d,
                  dtime5 : ((res.rows[i].a5dt).toString()).substring(0,24),
                  atime5 : ((res.rows[i].a5ddt).toString()).substring(0,24),
                  seat5 : res.rows[i].a5s,
                  price5 : res.rows[i].a5p,
                  ac6 : res.rows[i].a6a,
                  fn6 : res.rows[i].a6f,
                  iata6 : res.rows[i].a6i,
                  diata6 : res.rows[i].a6d,
                  dtime6 : ((res.rows[i].a6dt).toString()).substring(0,24),
                  atime6 : ((res.rows[i].a6ddt).toString()).substring(0,24),
                  seat6 : res.rows[i].a6s,
                  price6 : res.rows[i].a6p
                })
              }
              response.render('pages/rbooking2',{drinks : result})
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
              hours = 0
              days = 0
              minutes = 0
              if(typeof (res.rows[i].duration.hours) != "undefined"){
                hours = res.rows[i].duration.hours
              }
              if(typeof (res.rows[i].duration.days) != "undefined"){
                days = res.rows[i].duration.days
              }
              if(typeof(res.rows[i].duration.minutes) != "undefined"){
                minutes = res.rows[i].duration.minutes
              }
              console.log(res.rows[i])
                result.push({
                duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
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
    }
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
            var tex = 'select a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice AS tprice, (a2.ddate - a1.date) + (a4.ddate - a3.date) AS duration,a1.iata as a1i, a3.iata as a3i, a4.iata as a4i, a2.iata as a2i, a4.diata as a4d, a3.diata as a3d, a1.diata as a1d,a2.diata as a2d,a3.firstclassprice as a3p, a4.firstclassprice as a4p, a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.fseat as a3s, a4.fseat as a4s, a1.fseat as a1s,a2.fseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a, a3.airlinecode as a3a, a4.airlinecode as a4a, a1.flightnumber as a1f,a2.flightnumber as a2f, a3.flightnumber as a3f, a4.flightnumber as a4f, a3.date as a3dt, a4.date as a4dt, a1.date as a1dt,a2.date as a2dt, a3.ddate as a3ddt, a4.ddate as a4ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from ((flight natural join price) as a1 join (flight  natural join price) AS a2 on a1.diata = a2.iata) cross join ((flight natural join price) as a3 join (flight  natural join price) AS a4 on a3.diata = a4.iata) where (a1.iata = $3 and a2.diata = $4 and (a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 AND a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $1 and a1.date < $5) AND (a3.iata = $4 and a4.diata = $3 and (a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 and a3.ddate < a4.date and a4.fseat > 0 and a3.fseat > 0 and a3.date >= $2 AND a3.date < $6) ORDER BY a2.ddate - a1.date ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice AS tprice, (a2.ddate - a1.date) + (a4.ddate - a3.date) AS duration,a1.iata as a1i, a3.iata as a3i, a4.iata as a4i, a2.iata as a2i, a4.diata as a4d, a3.diata as a3d, a1.diata as a1d,a2.diata as a2d,a3.economyclassprice as a3p, a4.economyclassprice as a4p, a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.eseat as a3s, a4.eseat as a4s, a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a, a3.airlinecode as a3a, a4.airlinecode as a4a, a1.flightnumber as a1f,a2.flightnumber as a2f, a3.flightnumber as a3f, a4.flightnumber as a4f, a3.date as a3dt, a4.date as a4dt, a1.date as a1dt,a2.date as a2dt, a3.ddate as a3ddt, a4.ddate as a4ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from ((flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata) cross join ((flight natural join price) as a3 join (flight natural join price) AS a4 on a3.diata = a4.iata) where (a1.iata = $3 and a2.diata = $4 and (a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 AND a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $1 and a1.date < $5) AND (a3.iata = $4 and a4.diata = $3 and (a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 and a3.ddate < a4.date and a4.eseat > 0 and a3.eseat > 0 and a3.date >= $2 AND a3.date < $6) ORDER BY a2.ddate - a1.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'select a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice AS tprice, (a2.ddate - a1.date) + (a4.ddate - a3.date) AS duration,a1.iata as a1i, a3.iata as a3i, a4.iata as a4i, a2.iata as a2i, a3.diata as a3d, a4.diata as a4d, a1.diata as a1d,a2.diata as a2d,a3.firstclassprice as a3p, a4.firstclassprice as a4p, a1.firstclassprice as a1p,a2.firstclassprice as a2p,a3.fseat as a3s, a4.fseat as a4s, a1.fseat as a1s,a2.fseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a, a3.airlinecode as a3a, a4.airlinecode as a4a, a1.flightnumber as a1f,a2.flightnumber as a2f, a3.flightnumber as a3f, a4.flightnumber as a4f, a3.date as a3dt, a4.date as a4dt, a1.date as a1dt,a2.date as a2dt, a3.ddate as a3ddt, a4.ddate as a4ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from ((flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata) cross join ((flight natural join price) as a3 join (flight  natural join price) AS a4 on a3.diata = a4.iata) where (a1.iata = $3 and a2.diata = $4 and (a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 AND a1.ddate < a2.date and a2.fseat > 0 and a1.fseat > 0 and a1.date >= $1 and a1.date < $5) AND (a3.iata = $4 and a4.diata = $3 and (a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 and a3.ddate < a4.date and a4.fseat > 0 and a3.fseat > 0 and a3.date >= $2 AND a3.date < $6) ORDER BY a2.firstclassprice + a1.firstclassprice + a3.firstclassprice + a4.firstclassprice ASC'
          else
            var tex = 'select a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice AS tprice, (a2.ddate - a1.date) + (a4.ddate - a3.date) AS duration,a1.iata as a1i, a3.iata as a3i, a4.iata as a4i, a2.iata as a2i, a3.diata as a3d, a4.diata as a4d, a1.diata as a1d,a2.diata as a2d,a3.economyclassprice as a3p, a4.economyclassprice as a4p, a1.economyclassprice as a1p,a2.economyclassprice as a2p,a3.eseat as a3s, a4.eseat as a4s, a1.eseat as a1s,a2.eseat as a2s,a1.airlinecode as a1a,a2.airlinecode as a2a, a3.airlinecode as a3a, a4.airlinecode as a4a, a1.flightnumber as a1f,a2.flightnumber as a2f, a3.flightnumber as a3f, a4.flightnumber as a4f, a3.date as a3dt, a4.date as a4dt, a1.date as a1dt,a2.date as a2dt, a3.ddate as a3ddt, a4.ddate as a4ddt, a1.ddate as a1ddt,a2.ddate as a2ddt from ((flight natural join price) as a1 join (flight natural join price) AS a2 on a1.diata = a2.iata) cross join ((flight natural join price) as a3 join (flight  natural join price) AS a4 on a3.diata = a4.iata) where (a1.iata = $3 and a2.diata = $4 and (a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 AND a1.ddate < a2.date and a2.eseat > 0 and a1.eseat > 0 and a1.date >= $1 and a1.date < $5) AND (a3.iata = $4 and a4.diata = $3 and (a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice) < $7 AND ((a2.ddate - a1.date) + (a4.ddate - a3.date)) < $8 and a3.ddate < a4.date and a4.eseat > 0 and a3.eseat > 0 and a3.date >= $2 AND a3.date < $6) ORDER BY a2.economyclassprice + a1.economyclassprice + a3.economyclassprice + a4.economyclassprice ASC'
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
                hours = 0
                days = 0
                minutes = 0
                if(typeof (res.rows[i].duration.hours) != "undefined"){
                  hours = res.rows[i].duration.hours
                }
                if(typeof (res.rows[i].duration.days) != "undefined"){
                  days = res.rows[i].duration.days
                }
                if(typeof(res.rows[i].duration.minutes) != "undefined"){
                  minutes = res.rows[i].duration.minutes
                }
                console.log(res.rows[i])
                  result.push({
                  duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
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
                  price3 : res.rows[i].a3p,
                  ac4 : res.rows[i].a4a,
                  fn4 : res.rows[i].a4f,
                  iata4 : res.rows[i].a4i,
                  diata4 : res.rows[i].a4d,
                  dtime4 : ((res.rows[i].a4dt).toString()).substring(0,24),
                  atime4 : ((res.rows[i].a4ddt).toString()).substring(0,24),
                  seat4 : res.rows[i].a4s,
                  price4 : res.rows[i].a4p
                })
              }
              response.render('pages/rbooking1',{drinks : result})
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
              hours = 0
              days = 0
              minutes = 0
              if(typeof (res.rows[i].duration.hours) != "undefined"){
                hours = res.rows[i].duration.hours
              }
              if(typeof (res.rows[i].duration.days) != "undefined"){
                days = res.rows[i].duration.days
              }
              if(typeof(res.rows[i].duration.minutes) != "undefined"){
                minutes = res.rows[i].duration.minutes
              }
              console.log(res.rows[i])
                result.push({
                duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
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
            response.sendFile('Web_design/ebooking.html', {root: __dirname })
          }
        }
      })
    }
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
            var tex = 'SELECT a1.airlinecode as ba1,a2.airlinecode as ba2,a1.flightnumber as bf1,a2.flightnumber as bf2,a1.iata as bi1, a2.iata as bi2, a1.date as bd1, a2.date as bd2, a1.ddate as bdd1, a2.ddate as bdd2, a1.diata as bdi1, a2.diata as bdi2, ((a2.ddate - a2.date) + (a1.ddate - a1.date)) AS duration, (a1.firstclassprice + a2.firstclassprice) as tprice, a1.fseat as um, a2.fseat as um2, * FROM (flight Natural Join price) AS a1 CROSS JOIN (flight Natural Join price) AS a2 WHERE ( (a1.date >= $1  AND a1.date < $5 AND a1.firstclassprice < $7 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a1.iata = $3 AND a1.diata = $4 AND a1.fseat > 0)) AND (a2.date >= $2 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a2.date < $6 AND a2.firstclassprice < $7 AND a2.iata = $4 AND a2.diata = $3 AND a2.fseat > 0) ORDER BY a2.ddate - a1.date ASC'
          else
            var tex = 'SELECT a1.airlinecode as ba1,a2.airlinecode as ba2,a1.flightnumber as bf1,a2.flightnumber as bf2,a1.iata as bi1, a2.iata as bi2, a1.date as bd1, a2.date as bd2, a1.ddate as bdd1, a2.ddate as bdd2, a1.diata as bdi1, a2.diata as bdi2,((a2.ddate - a2.date) + (a1.ddate - a1.date))  AS duration, (a1.economyclassprice + a2.economyclassprice) as tprice, a1.fseat as um, a2.fseat as um2, * FROM (flight Natural Join price) AS a1 CROSS JOIN (flight Natural Join price) AS a2 WHERE ( (a1.date >= $1  AND a1.date < $5 AND a1.economyclassprice < $7 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a1.iata = $3 AND a1.diata = $4 AND a1.eseat > 0)) AND (a2.date >= $2 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a2.date < $6 AND a2.economyclassprice < $7 AND a2.iata = $4 AND a2.diata = $3 AND a2.eseat > 0) ORDER BY a2.ddate - a1.date ASC'
        }
        else{
          if(req.body.price == "First")
          var tex = 'SELECT a1.airlinecode as ba1,a2.airlinecode as ba2,a1.flightnumber as bf1,a2.flightnumber as bf2,a1.iata as bi1, a2.iata as bi2, a1.date as bd1, a2.date as bd2, a1.ddate as bdd1, a2.ddate as bdd2, a1.diata as bdi1, a2.diata as bdi2,((a2.ddate - a2.date) + (a1.ddate - a1.date))  AS duration, (a1.firstclassprice + a2.firstclassprice) as tprice, a1.fseat as um, a2.fseat as um2, * FROM (flight Natural Join price) AS a1 CROSS JOIN (flight Natural Join price) AS a2 WHERE ( (a1.date >= $1  AND a1.date < $5 AND a1.firstclassprice < $7 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a1.iata = $3 AND a1.diata = $4 AND a1.fseat > 0)) AND (a2.date >= $2 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a2.date < $6 AND a2.firstclassprice < $7 AND a2.iata = $4 AND a2.diata = $3 AND a2.fseat > 0) ORDER BY a1.firstclassprice + a2.firstclassprice ASC'
          else
          var tex = 'SELECT a1.airlinecode as ba1,a2.airlinecode as ba2,a1.flightnumber as bf1,a2.flightnumber as bf2,a1.iata as bi1, a2.iata as bi2, a1.date as bd1, a2.date as bd2, a1.ddate as bdd1, a2.ddate as bdd2, a1.diata as bdi1, a2.diata as bdi2,((a2.ddate - a2.date) + (a1.ddate - a1.date))  AS duration, (a1.economyclassprice + a2.economyclassprice) as tprice, a1.fseat as um, a2.fseat as um2, * FROM (flight Natural Join price) AS a1 CROSS JOIN (flight Natural Join price) AS a2 WHERE ( (a1.date >= $1  AND a1.date < $5 AND a1.economyclassprice < $7 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a1.iata = $3 AND a1.diata = $4 AND a1.eseat > 0)) AND (a2.date >= $2 AND ((a2.ddate - a2.date) + (a1.ddate - a1.date)) < $8 AND a2.date < $6 AND a2.economyclassprice < $7 AND a2.iata = $4 AND a2.diata = $3 AND a2.eseat > 0) ORDER BY a2.ddate - a1.date ASC'
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
              console.log(res.rows[0])
              var result = []

              for(i = 0; i < res.rows.length; i++){
                hours = 0
                days = 0
                minutes = 0
                if(typeof (res.rows[i].duration.hours) != "undefined"){
                  hours = res.rows[i].duration.hours
                }
                if(typeof (res.rows[i].duration.days) != "undefined"){
                  days = res.rows[i].duration.days
                }
                if(typeof(res.rows[i].duration.minutes) != "undefined"){
                  minutes = res.rows[i].duration.minutes
                }
                result.push({
                  duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
                  tprice : '$'+res.rows[i].tprice,
                  class : test,
                  ac : res.rows[i].ba1,
                  fn : res.rows[i].bf1,
                  iata : res.rows[i].bi1,
                  diata : res.rows[i].bdi1,
                  dtime : ((res.rows[i].bd1).toString()).substring(0,24),
                  atime : ((res.rows[i].bdd1).toString()).substring(0,24),
                  seat : res.rows[i].um,
                  ac1 : res.rows[i].ba2,
                  fn1 : res.rows[i].bf2,
                  iata1 : res.rows[i].bi2,
                  diata1 : res.rows[i].bdi2,
                  dtime1 : ((res.rows[i].bd2).toString()).substring(0,24),
                  atime1 : ((res.rows[i].bdd2).toString()).substring(0,24),
                  seat1 : res.rows[i].um2
                })
              }
              console.log(result)
              response.render('pages/rbooking',{drinks : result})
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
      }
      else{
        var value = [req.body.ddate,req.body.iata,req.body.diata,req.body.ddate+' 24:00:00',price,duration]
        if(req.body.order == "Flight Length"){
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice, flight.fseat as gg, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.firstclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.fseat > 0) ORDER BY flight.ddate - flight.date ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice, flight.eseat as gg, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.economyclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.eseat > 0) ORDER BY flight.ddate - flight.date ASC'
        }
        else{
          if(req.body.price == "First")
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.firstclassprice as tprice,flight.fseat as gg,  * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.firstclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.fseat > 0) ORDER BY price.firstclassprice  ASC'
          else
            var tex = 'SELECT (flight.ddate - flight.date) AS duration, price.economyclassprice as tprice,flight.eseat as gg, * FROM flight Join price ON flight.airlinecode = price.airlinecode AND flight.flightnumber = price.flightnumber WHERE (flight.date >= $1 AND (flight.ddate - flight.date) < $6 AND flight.date < $4 AND price.economyclassprice < $5 AND flight.iata = $2 AND flight.diata = $3 AND flight.eseat > 0) ORDER BY price.economyclassprice ASC'
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
              hours = 0
              days = 0
              minutes = 0
              if(typeof(res.rows[i].duration.hours) != "undefined"){
                hours = res.rows[i].duration.hours
              }
              if(typeof(res.rows[i].duration.days) != "undefined"){
                days = res.rows[i].duration.days
              }
              if(typeof(res.rows[i].duration.minutes) != "undefined"){
                minutes = res.rows[i].duration.minutes
              }
              result.push({
                duration : days+ ' days and ' +hours+ ' hours and '+minutes+ ' minutes',
                tprice : '$'+res.rows[i].tprice,
                class : test,
                ac : res.rows[i].airlinecode,
                fn : res.rows[i].flightnumber,
                iata : res.rows[i].iata,
                diata : res.rows[i].diata,
                dtime : ((res.rows[i].date).toString()).substring(0,24),
                atime : ((res.rows[i].ddate).toString()).substring(0,24),
                seat : res.rows[i].gg
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
    }
    })
  }
})

app.listen(8080, function(){
  pg.connect(conString, function (err, client, done) {
    if (err) {
      return console.error('could not connect to postgres', err)
    } 
    const text5 = 'SELECT MAX(bookingnumber) as book FROM booking'
    const values5 = []
    client.query(text5, values5, (err, res) => {
      if (err) {
        console.log (err.stack)
        done
      } else{
        var temp = parseInt(res.rows[0].book) + 1
        if(temp >= bookingnumber){
          bookingnumber = temp
        }
        done
      }
    })
  })
  console.log('Server running at http://127.0.0.1:8080/');
})