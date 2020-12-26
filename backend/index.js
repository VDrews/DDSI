'use strict'

const express=require('express')
const bodyParser=require('body-parser')
const port = 8000

const marketing = require('./sql/marketing')

const app=express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


var cors = require('cors');

app.use(cors());
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'frontend',
  password : 'DDSI2020',
  database: 'DDSI'
});

connection.connect();


app.post('/campanya', (req, res) => {
  connection.query(marketing.crearCampanya(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(412).send("Ya existe una campaña con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

//Asociar campanya
app.post('/campanya/:nombre', (req, res) => {
  connection.query(marketing.asociarCampanya({
    ean: req.body.ean,
    nombre: req.params.nombre, 
    descuento: req.body.descuento
  }), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(412).send("El producto o la campanya no existen");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/campanya/:nombre', (req, res) => {
  connection.query(marketing.consultarCampanya({nombre: req.params.nombre}), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})

app.post('/producto', (req, res) => {
  connection.query(marketing.crearProducto(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(412).send("Ya existe un producto con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/producto/:ean', (req, res) => {
  connection.query(marketing.consultarProducto({ean: req.params.ean}), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows);
  });
})

app.post('/analitica', (req, res) => {
  connection.query(marketing.crearAnalitica(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(412).send("Ya existe un producto con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/analitica/:id', (req, res) => {
  console.log(req.params.id)
  connection.query(marketing.consultarAnalitica({id: req.params.id}), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})



app.listen(port, () => {
  console.log(`Backend funcionando en http://localhost:${port}`)
})



process.on('exit', function() {
  connection.end();
});
