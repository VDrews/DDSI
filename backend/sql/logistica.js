let sinVariable = `CREATE TABLE WHERE ***`


//
// ───────────────────────────────────────────────────── RECIBIR PRODUCTO 2.1 ─────
//


// EAN producto? Lo generamos aleatoriamente o nos lo cuajamos sobre la marcha?
/* let insertarAlmacen_2_1 = function ({codigo_alm, EAN_prod, unidades}) {
  return `insert into Inventario (codigo_alm, EAN_producto, estado_cant_afectada) values
    (${codigo_alm}, ${EAN_prod}, ${unidades});`

}
 */
let insertarProducto_2_1 = function({EAN_prod, nombre_prod, fabricante, precio}) {
  return `insert into Producto (EAN_producto, nombre, fabricante, precio) values
    (${EAN_prod}, '${nombre_prod}', '${fabricante}', ${precio});`
}


//
// ────────────────────────────────────── ENVIAR PRODUCTO ENTRE ALMACENES 2.2 ─────
//


/*
  Insertar paquete con insertarPaquete() (+ llamar a insertarContenido_2_2); sacar ID
  Insertar relación en Distribución
  Actualizar inventario
*/

let insertarDistribucion_2_2 = function ({ID_paquete, cod_almacen}) {
  return `insert into Distribucion (ID_paquete, fecha_envio, fecha_llegada,cod_almacen) values
    (${ID_paquete}, Now(), DATE_ADD(Now(), interval 3 DAY), ${cod_almacen});`
}


let insertarContenido = function ({ID_paquete, EAN_producto, cantidad}) {
  return `insert into Contenido (ID_paquete, EAN_producto, cantidad) values
    (${ID_paquete}, ${EAN_producto}, ${cantidad});`
}


//
// ───────────────────────────────────────────────── ELEGIR TRANSPORTISTA 2.5 ─────
//


let elegirTransportista_2_5 = function ({transportista, ID_paquete}) {
  return `update Paquete set transportista='${transportista}' where ID_paquete=${ID_paquete};`
}


//
// ───────────────────────────────────────────────────── COMPRAR PRODUCTO 2.6 ─────
//


let insertarPaquete = function ({transportista}) {
  return `insert into Paquete (transportista) values ('${transportista}'); `
}

let getIdPaquete = function() {
	return `SELECT LAST_INSERT_ID();`
}

let insertarEnvio_2_6 = function ({ID_paquete, nombre_usuario}) {
  return `insert into Envio (ID, nombre_usuario, fecha_envio, fecha_llegada) values (${ID_paquete}, '${nombre_usuario}', Now(), DATE_ADD(Now(), interval 3 DAY));`
}

let insertarCompraVenta_2_6 = function ({codigo_factura, ID_paquete}) {
  return `insert into CompraVenta (cod_factura, ID_paquete, tipo) values
      (${codigo_factura}, ${ID_paquete}, 'Venta');`
}

/*
    Para conseguir la factura, en una misma función,
      `insert into Factura values (null)`
    y acto seguiodo en la misma conexión
      `select LAST_INSERT_ID()`
    Lo devuelto es la clave requerida para el autoincrement.
*/



// ────────────────────────────────────────────────────────────────────────────────


module.exports = {
  insertarProducto_2_1,
  insertarDistribucion_2_2, insertarContenido,
  elegirTransportista_2_5,
  insertarCompraVenta_2_6, insertarEnvio_2_6, insertarPaquete,

  getIdPaquete,
}
 