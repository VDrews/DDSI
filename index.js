'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 8080
const history = require('connect-history-api-fallback');


const marketing = require('./backend/sql/marketing')
const inventario = require('./backend/sql/inventario')
const rrhh = require('./backend/sql/rrhh')
const logistica = require('./backend/sql/logistica')
const contabilidad = require('./backend/sql/contabilidad')


const app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'frontend',
//   password: 'DDSI2020',
//   database: 'DDSI'
// });
// var connection = mysql.createConnection({
//   host: 'eu-cdbr-west-03.cleardb.net',
//   user: 'b93f80375031dd',
//   password: 'f53dce90',
//   database: 'heroku_1e1951efc954bab'
// });
var connection
function handleDisconnect() {
  connection = mysql.createConnection('mysql://b93f80375031dd:f53dce90@eu-cdbr-west-03.cleardb.net/heroku_1e1951efc954bab?reconnect=true');
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

const random_EAN = () => {
  min = 0
  max = 2147000000
  let num = Math.random() * (max - min) + min;

  return Math.round(num);
};

// app.use(history());
app.use(express.static('frontend/dist'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/frontend/dist/index.html');
});

//
// ────────────────────────────────────────────────────────── I ──────────
//   :::::: M A R K E T I N G : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

app.post('/api/campanya', (req, res) => {
  connection.query(marketing.crearCampanya(req.body), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe una campaña con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

//Asociar campanya
app.post('/api/campanya/:nombre', (req, res) => {
  connection.query(marketing.asociarCampanya({
    ean: req.body.ean,
    nombre: req.params.nombre,
    descuento: req.body.descuento
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("El producto o la campanya no existen");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/api/campanya/:nombre', (req, res) => {
  connection.query(marketing.consultarCampanya({
    nombre: req.params.nombre
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})

app.post('/api/producto', (req, res) => {
  connection.query(marketing.crearProducto(req.body), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe un producto con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/api/producto/:ean', (req, res) => {
  console.log(req.body)
  connection.query(marketing.consultarProducto({
    ean: req.params.ean
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows);
  });
})

app.post('/api/analitica', (req, res) => {
  connection.query(marketing.crearAnalitica(req.body.dni), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe un producto con este ID");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.get('/api/analitica/:id', (req, res) => {
  console.log(req.params.id)
  connection.query(marketing.consultarAnalitica({
    id: req.params.id
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})

//
// ────────────────────────────────────────────────────────── V ──────────
//   :::::: A L M A C E N E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

app.put('/api/producto/:ean', (req, res) => {
  connection.query(inventario.actualizarInventario({
    ean: req.params.ean,
    ...req.body
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(404).send("No existe producto en el almacen. Crealo antes");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.post('/api/producto/:ean', (req, res) => {
  console.log(req.body)
  connection.query(inventario.newInventario({
    ean: req.params.ean,
    ...req.body
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe producto. Actualizar");
    }
    return res.sendStatus(200);
  });
})

app.put('/api/producto/:ean', (req, res) => {
  connection.query(inventario.defineEstado(req.body), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(404).send("No existe producto en el almacen");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.post('/api/almacen', (req, res) => {
  connection.query(inventario.addAlmacen(req.body), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("Ya existe almacen con este codigo");
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})

app.delete('/api/producto', (req, res)=>{
  connection.query(inventario.dropProducto(req.body), function(err, rows, fields){
    if (err) {
      console.log(err)
      return res.status(412).send("No existe ese producto");
    }
    console.log(rows);
    connection.commit(function (err) {
      if (err) {
        connection.rollback(function () {
          return res.sendStatus(500);
        });
      }
      return res.sendStatus(200);
    });
  });
})


app.delete('/api/producto/:ean', (req, res)=>{
  connection.query(inventario.eliminarStock({
    ean: req.params.ean,
    ...req.body
    }), function(err, rows, fields){
    if (err) {
      console.log(err)
      return res.status(412).send("No existe ese producto");
    }
    console.log(rows);
    connection.commit(function (err) {
      if (err) {
        connection.rollback(function () {
          return res.sendStatus(500);
        });
      }
      return res.sendStatus(200);
    });
  });
})


//
// ──────────────────────────────────────────────────────────────────────── III ──────────
//   :::::: R E C U R S O S   H U M A N O S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
//

app.get('/api/empleado/:dni', (req, res) => {
  console.log(req.params.dni)
  connection.query(rrhh.consultarEmpleado({
    dni: req.params.dni
  }), function (err, rows, fields) {
    if (rows.length() == 0){
      return res.status(404).send("No existe ningún empleado con ese DNI.");
    }
    else {
      if (err) {
        console.log(err)
        return res.sendStatus(404);
      }
      console.log(rows);
      return res.send(rows[0]);
    }
  });
})

app.delete('/api/empleado/:dni', (req, res) => {
  console.log(req.params)
  connection.query(rrhh.darBajaEmpleado(req.params), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(412).send("No existe un empleado con ese dni");
    }
    console.log(rows);
    connection.commit(function (err) {
      if (err) {
        connection.rollback(function () {
          return res.sendStatus(500);
        });
      }
      return res.sendStatus(200);
    });
  });
})

app.post('/api/empleado', (req, res) => {
  console.log(req.body)
  connection.beginTransaction(function (err) {
    if (err) {
      return res.sendStatus(500)
    }
    connection.query(rrhh.contratarEmpleado(req.body), function (err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function () {
          return res.sendStatus(412);
        });
      }
      connection.query(rrhh.crearContrato(req.body), function (err, rows, fields) {
        if (err) {
          connection.rollback(function () {
            return res.sendStatus(412);
          });
        }
        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
              return res.sendStatus(500);
            });
          }
          return res.sendStatus(200);
        });
      })
    })
  })
})

app.put('/api/empleado/:dni', (req, res) => {
  connection.beginTransaction(function (err) {
    connection.query(rrhh.modificarEmpleado({dni: req.params.dni, ...req.body}), function (err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function () {
          return res.sendStatus(412);
        });
      }
      connection.query(rrhh.modificarContrato({dni: req.params.dni, ...req.body}), function (err, rows, fields) {
        if (err) {
          console.log(err)
          connection.rollback(function () {
            return res.sendStatus(412);
          });
        }
        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
              return res.sendStatus(500);
            });
          }
          return res.sendStatus(200);
        });
      })
    })
  })
})


//
// ────────────────────────────────────────────────────────── IV ──────────
//   :::::: C O N T A B I L I D A D : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

app.post('/api/ingreso', (req, res) => {
  connection.query(contabilidad.anotarIngresoGasto(req.body), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(412);
    }
    console.log(rows);
    return res.sendStatus(200);
  });
})


app.get('/api/ingreso/:nombre_usuario', (req, res) => {
  console.log(req.params.nombre_usuario)
  connection.query(contabilidad.consultarIngresoGasto({
    nombre_usuario: req.params.nombre_usuario
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows);
  });
})


app.put('/ingreso/:codigo_tr', (req, res) => {
  connection.query(contabilidad.consultarIngresoGasto(req.params), function (err, rows, fields){
    if (rows.length() == 0){
      return res.status(404).send("No existe dicha transacción");
    }
    else{
      connection.query(contabilidad.modificarIngresoGasto({
        codigo_tr: req.params.codigo_tr,
        ...req.body
      }), function (err, rows, fields) {
        if (err) {
          console.log(err)
          return res.status(404).send("No existe dicha transacción");
        }
        console.log(rows);
        return res.sendStatus(200);
      });
    }
  })
})

app.get('/api/factura/:cod_factura', (req, res) => {
  connection.query(contabilidad.obtenerDatosFactura(req.params), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.sendStatus(404);
    }
    console.log(rows);
    return res.send(rows[0]);
  });
})

//
// ────────────────────────────────────────────────────────── II ──────────
//   :::::: L O G I S T I C A : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────
//

//
// ────────────────────────────────────────────────────────────────────── 2.1 ─────
//

app.post('/api/logistica/recibir', (req, res) => {
  /*
    Pasos:
      1. Insertar el nuevo producto en la base de datos. Hacerlo mediante insertarProducto_2_1.
        1.1 NOTE para ello necesitaré un EAN_producto. Cuidado con esto.
      2. Insertar en algún almacén. Usar newInventario de Chema.
  */

  connection.beginTransaction(function (err) {
    if (err) {
      return res.status(500)
    }

    connection.log(req.body)
    EAN_generado = random_EAN()

    connection.query(logistica.insertarProducto_2_1({
      EAN_prod: EAN_generado,
      nombre_prod: req.body.nombre_producto,
      fabricante: req.body.fabricante,
      precio: req.body.precio
    }), function (err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function () {
          return res.status(500).send("No se ha podido insertar el producto");
        })
      }

      // Producto insertado. Meter ahora en el inventario.
      connection.query(inventario.newInventario({
        codigo_alm: req.body.almacen,
        ean: EAN_generado,
        cantidad: req.body.cantidad
      }), function (err, rows, field) {
        if (err) {
          connection.rollback(function () {
            return res.status(500);
          })
        }

        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
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

/*
  EPeA_2_2: {
    almacen_partida: "",
    EAN: "",
    cantidad: null,
    almacen_llegada: ""
  },
*/

app.post('/api/logistica/almacenes', (req, res) => {
  /*
    Pasos:
      1. Restar `cantidad` en la relación inventario con el almacen_partida. Usar las funciones de Chema.
      2. Sumar `cantidad` en la relación inventario con el almacen_llegada. Usar las funciones de Chema.
      3. Gestionar el envío:
        3.1 Crear un paquete con nuestro producto (función insertarPaquete(transportista)) (Sacar el último ID)
        3.2 Añadir la distribución del paquete (insertarDisrtibucion_2_2(ID_paquete, almacen_partida))
        3.3 Insertar en la relación contenido (insertarContenido2_2(ID_paquete, EAN_producto, cantidad))
  */

  // 1
  connection.query(inventario.actualizarInventario({
    ean       : req.body.EAN,
    codigo_alm: req.body.almacen_partida,
    cantidad  : -req.body.cantidad
  }), function(err, rows, fields) {
    if (err) {
      console.log(err)
      connection.rollback(function () {
        return res.sendStatus(412);
      });
    }

    // 2
    connection.query(inventario.actualizarInventario({
      ean       : req.body.EAN,
      codigo_alm: req.body.almacen_llegada,
      cantidad  : req.body.cantidad
    }), function(err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function () {
          return res.sendStatus(412);
        });
      }

      //3.1
      connection.query(logistica.insertarPaquete({
        transportista: "Envíos internos"
      }), function (err, rows, fields) {
        if (err) {
          console.log(err)
          connection.rollback(function () {
            return res.sendSatus(412);
          });
        }

        connection.query(logistica.getIdPaquete(), function(err, rows, fields) {
          let ID_paquete = rows[0]['LAST_INSERT_ID()'];

          //3.2
          connection.query(logistica.insertarDistribucion_2_2({
            ID_paquete: ID_paquete,
            cod_almacen: req.body.almacen_partida
          }), function(err, rows, fields) {
            if (err) {
              console.log(err)
              connection.rollback(function () {
                return res.sendSatus(412);
              });
            }

            //3.3
            connection.query(logistica.insertarContenido({
              ID_paquete: ID_paquete,
              EAN_producto: req.body.EAN,
              cantidad: req.body.cantidad
            }), function(err, rows, fields) {
              if (err) {
                console.log(err)
                connection.rollback(function () {
                  return res.sendSatus(412);
                });
              }

              connection.commit(function (err) {
                if (err) {
                  connection.rollback(function () {
                    return res.sendStatus(500);
                  });
                }
                return res.sendStatus(200);
              });
            })
          })
        })
      })
    })
  })
})

//
// ────────────────────────────────────────────────────────────────────── 2.5 ─────
//

app.put('/api/logistica/:ID_paquete', (req, res) => {
  /*
    Actualizar el parámetro transportista de la instancia pertinente de Paquete.
  */
  connection.query(logistica.elegirTransportista_2_5({
    transportista: req.params.transportista,
    ID_paquete: req.params.ID_paquete
  }), function (err, rows, fields) {
    if (err) {
      console.log(err)
      return res.status(404).send("No se ha podido cambiar el transportista")
      // FIXME             ^^^^^ ¿si falla es porque no lo encuentra?
    }

    console.log(rows)
    return res.status(200).send("Transportista actualizado con éxito")
  });
})

//
// ────────────────────────────────────────────────────────────────────── 2.6 ─────
//

/*

  CP_2_6: {
    cliente: "",
    EAN_producto: "",
    cantidad: null,
    transportista: ""
  },

*/

app.post('/api/logistica/compra', (req, res) => {
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
  connection.beginTransaction(function (err) {
    if (err) {
      return res.sendStatus(500)
    }
    //1.1
    connection.query(logistica.insertarPaquete({
      transportista: req.body.transportista
    }), function (err, rows, fields) {
      if (err) {
        console.log(err)
        connection.rollback(function () {
          return res.sendStatus(412);
        });
      }

      connection.query(logistica.getIdPaquete(), function (err, rows, fields) {
        let ID_paquete = rows[0]['LAST_INSERT_ID()'];

        //1.2
        connection.query(logistica.insertarEnvio_2_6({
          ID_paquete,
          nombre_usuario: req.body.cliente
        }), function (err, rows, fields) {
          if (err) {
            console.log(err)
            connection.rollback(function () {
              return res.sendStatus(412);
            });
          }
          //1.3
          connection.query(logistica.insertarContenido({
            ID_paquete,
            EAN_producto: req.body.EAN,
            cantidad: req.body.cantidad
          }), function (err, rows, fields) {
            if (err) {
              console.log(err)
              connection.rollback(function () {
                return res.sendStatus(412);
              });
            }

            //2.1
            connection.query(contabilidad.crearFactura(), function (err, rows, fields) {
              if (err) {
                console.log(err)
                connection.rollback(function () {
                  return res.sendStatus(412);
                });
              }
              connection.query(contabilidad.getCodFactura(), function (err, rows, fields) {
                let codigo_factura = rows[0]['LAST_INSERT_ID()'];
                console.log(ID_paquete, codigo_factura)
                connection.query(logistica.insertarCompraVenta_2_6({
                  codigo_factura: codigo_factura,
                  ID_paquete: ID_paquete
                }), function (err, rows, fields) {
                  if (err) {
                    console.log(err)
                    connection.rollback(function () {
                      return res.sendStatus(412);
                    });
                  }
                  connection.commit(function (err) {
                    if (err) {
                      connection.rollback(function () {
                        return res.sendStatus(500);
                      });
                    }
                    return res.sendStatus(200);
                  });
                })

              })
            })
          })
        })
      })
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`Backend funcionando en http://localhost:${port}`)
})

process.on('error', function (err) {
  console.log(err);
});

process.on('exit', function () {
  connection.end();
});