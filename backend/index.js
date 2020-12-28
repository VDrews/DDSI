'use strict'

const express=require('express')
const bodyParser=require('body-parser')
const path = require('path')
const port = 8000
var serveStatic = require('serve-static');


const marketing = require('./sql/marketing')
const inventario = require('./sql/inventario')
const rrhh = require('./sql/rrhh')
const logistica = require('./sql/logisitca')
const contabilidad = require('./sql/contabilidad')


const app=express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


var cors = require('cors');

app.use(cors());
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');
const { contratarEmpleado, crearContrato } = require('./sql/rrhh')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'frontend',
  password : 'DDSI2020',
  database : 'DDSI'
});

connection.connect();


app.post('/campanya', (req, res) => {
  connection.query(marketing.crearCampanya(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe una campaña con este ID");
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
      return res.status(412).send("El producto o la campanya no existen");
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
      return res.status(412).send("Ya existe un producto con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/producto/:ean', (req, res) => {
  console.log(req.body)
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
  connection.query(marketing.crearAnalitica(req.body.dni), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe un producto con este ID");
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

//Inventario

app.put('/producto/:ean', (req, res) => {
  connection.query(inventario.actualizarInventario({
    ean: req.params.ean,
    ...req.body
  }), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(404).send("No existe producto en el almacen. Crealo antes");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.post('/producto/:ean', (req, res) => {
  console.log(req.body)
  connection.query(inventario.newInventario({
    ean: req.params.ean,
    ...req.body
  }), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe producto. Actualizar");
    }
    return res.sendStatus(200);
  });
})

// RRHH 
app.get('/empleado/:dni', (req, res) => {
  console.log(req.params.dni)
  connection.query(rrhh.consultarEmpleado({dni: req.params.dni}), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})

app.delete('/empleado/:dni', (req, res) => {
  console.log(req.params)
  connection.query(rrhh.darBajaEmpleado(req.params), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("No existe un empleado con ese dni");
    }
    console.log(rows);
    connection.commit(function(err) {
      if (err) { 
        connection.rollback(function() {
          return res.sendStatus(500);
        });
      }
      return res.sendStatus(200);
    });
  });
})

app.put('/producto/:ean', (req, res) => {
  connection.query(inventario.defineEstado(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(404).send("No existe producto en el almacen");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.post('/almacen', (req, res) => {
  connection.query(inventario.addAlmacen(req.body), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe almacen con este codigo");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.post('/factura', (req,res) => {

    connection.beginTransaction(function(err) {
      if (err) {
        return res.sendStatus(500)
      }

      connection.query(contabilidad.crearFactura(), function(err, rows, fields) {
        if (err) {
          console.log(err)
          connection.rollback(function() {
            return res.sendStatus(412);
          });
        }
        connection.query(contabilidad.getCodFactura(), function(err, rows, fields) {
          let cod_factura = rows[0]['LAST_INSERT_ID()'];
          let codigo_tr = req.body.codigo_tr
          console.log(cod_factura)
          connection.query(contabilidad.conectarGeneracion({
            cod_factura, codigo_tr
          }), function(err, rows, fields) {
            if (err) {
              console.log(err)
              connection.rollback(function() {
                return res.sendStatus(412);
              });
            }
    
            console.log("Generacion OK")
    
            connection.query(contabilidad.obtenerDatosFactura({codigo_tr}), function(err, rows, fields) {
              if (err) {
                console.log(err)
                connection.rollback(function() {
                  return res.sendStatus(412);
                });
              }
              console.log("Obtener DATOS OK")
              return res.status(200)
            })
    
          })
        })
      })

    })

})

app.post('/empleado', (req, res) => {
  console.log(req.body)
  connection.beginTransaction(function(err) {
    if (err) {
      return res.sendStatus(500)
    }
    connection.query(contratarEmpleado(req.body), function(err, rows, fields){
      if (err) {
        console.log(err)
        connection.rollback(function() {
          return res.sendStatus(412);
        });
      }
      connection.query(crearContrato(req.body), function(err, rows, fields){
        if (err) {
          connection.rollback(function() {
            return res.sendStatus(412);
          });
        }
        connection.commit(function(err) {
          if (err) { 
            connection.rollback(function() {
              return res.sendStatus(500);
            });
          }
          return res.sendStatus(200);
        });
      })
    })
  })
})

app.put('/empleado', (req, res) => {
  connection.beginTransaction(function(err) {
    connection.query(modificarEmpleado(req.body), function(err, rows, fields){
      if (err) {
        connection.rollback(function() {
          return res.sendStatus(412);
        });
      }
      connection.query(modificarContrato(req.body), function(err, rows, fields){
        if (err) {
          connection.rollback(function() {
            return res.sendStatus(412);
          });
        }
      })
    })
  })
})

// app.use(serveStatic(__dirname + "/frontend/dist"));

app.listen(port, () => {
  console.log(`Backend funcionando en http://localhost:${port}`)
})

process.on('error', function(err){
    console.log(err);
});

process.on('exit', function() {
  connection.end();
});
