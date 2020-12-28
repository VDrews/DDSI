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


//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: L O G I S T I C A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

//
// ────────────────────────────────────────────────────────────────────── 2.1 ─────
//

app.post('/logistica/recibir', (req, res) => {
  /*
    Pasos:
      1. Insertar el nuevo producto en la base de datos. Hacerlo mediante insertarProducto_2_1.
        1.1 NOTE para ello necesitaré un EAN_producto. Cuidado con esto.
      2. Insertar en algún almacén. Usar newInventario de Chema.
  */

  connection.beginTransaction(function(err) {
    if (err) {
      return res.status(500)
    }

    connection.log(req.body)
    EAN_generado = -1           // FIXME hace falta generar un EAN

    connection.query(logistica.insertarProducto_2_1({
      EAN_prod: EAN_generado,
      nombre_prod: req.body.nombre_producto,
      fabricante: req.body.fabricante,
      precio: req.body.precio
    }), function(err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function() {
          return res.status(500).send("No se ha podido insertar el producto");
        })
      }

      // Producto insertado. Meter ahora en el inventario.
      connection.query(inventario.newInventario({
        codigo_alm: req.body.almacen,
        ean: EAN_generado,
        cantidad: req.body.cantidad
      }), function(err, rows, field) {
        if (err) {
          connection.rollback(function() {
            return res.status(500);
          })
        }

        connection.commit(function(err) {
          if (err) {
            connection.rollback(function() {
              return res.status(500)
            })
          }
          return res.sendStatus(200)
        })
      })
    })
  })
})

//
// ────────────────────────────────────────────────────────────────────── 2.2 ─────
//

app.post('/logistica/almacenes', (req, res) => {
  connection.log(body)
  /*
    Pasos:
      1. Restar `cantidad` en la relación inventario con el almacen_partida. Usar las funciones de Chema.
      2. Sumar `cantidad` en la relación inventario con el almacen_llegada. Usar las funciones de Chema.
      3. Gestionar el envío:
        3.1 Crear un paquete con nuestro producto (función insertarPaquete(transportista)) (Sacar el último ID)
        3.2 Añadir la distribución del paquete (insertarDisrtibucion_2_2(ID_paquete, almacen_partida))
        3.3 Insertar en la relación contenido (insertarContenido2_2(ID_paquete, EAN_producto, cantidad))
  */
})

//
// ────────────────────────────────────────────────────────────────────── 2.5 ─────
//

app.put('/logistica/:ID_paquete', (req, res) => {
  /*
    Actualizar el parámetro transportista de la instancia pertinente de Paquete.
  */
  connection.query(logsitica.elegirTransportista_2_5 ({
    transportista: req.params.transportista,
    ID_paquete: req.params.ID_paquete
  }), function(err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404).send("No se ha podido cambiar el transportista")
      // FIXME             ^^^^^ ¿si falla es porque no lo encuentra?
    }

    console.log(rows)
    return res.sendStatus(200).send("Transportista actualizado con éxito")
  });
})

//
// ────────────────────────────────────────────────────────────────────── 2.6 ─────
//

app.post('logistica/compra', (req, res) => {
  /*
    Pasos:
      1. Gestionar el envío
        1.1 Insertar el paquete (insertarPaquete(transportista)) (Sacar el último ID)
        1.2 Meter en la relación de envio (insertarEnvio_2_6(ID_paquete, nombre_usuario))
        1.3 Meter en la relación con el producto (insertarContenido_2_6(ID_paquete, nombre_producto, cantidad))
      2. Crear la factura
        2.1 Crear la factura y sacar su último ID (¿Quizás Adri tenga una función?)
        2.2 Meter en la relación compraventa (insertarCompraventa_2_6(codigo_factura, nombre_producto))
  */
})

// ────────────────────────────────────────────────────────────────────────────────


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
