
let anotarIngresoGasto =  function({tipo, cantidad}) {
  return `insert into Transaccion (tipo, cantidad) values ('${tipo}', ${cantidad});`
}

// La otra opción sería buscar por el cod_transacción y cambiar el requisito f.
let consultarIngresoGasto = function({nombre_usuario}) {
	return `select tipo, cantidad from Transaccion where codigo_tr in (select codigo_Tr from Generacion where codigo_fac in (select cod_factura from CompraVenta where ID_paquete in (select ID from Envio where nombre_usuario = '${nombre_usuario}')))  `
} 

let modificarIngresoGasto = function({codigo_tr, tipo, cantidad}) {
	return `update Transaccion set tipo = '${tipo}', cantidad = ${cantidad} where codigo_tr = ${codigo_tr};`
}

let crearFactura = function() {
	return `insert into Factura (cod_factura) values(NULL);`
}

let getCodFactura = function() {
	return `SELECT LAST_INSERT_ID();`
}

let conectarGeneracion = function({cod_factura, codigo_tr}) {
	return `insert into Generacion (codigo_fac, codigo_tr) values (${cod_factura}, ${codigo_tr})`
}

let obtenerDatosFactura = function({cod_factura}) {
	return `select tipo, cantidad, codigo_fac, nombre_usuario from Transaccion Natural Join
(select codigo_fac, nombre_usuario, codigo_tr from Generacion g Join
(select nombre_usuario, cod_factura from Envio e Join 
(select id_paquete, cod_factura from CompraVenta where cod_factura = ${cod_factura}) AS compra ON(e.ID = compra.id_paquete)) AS generacion ON (generacion.cod_factura = g.codigo_fac)) AS transaccion`
}

module.exports = {anotarIngresoGasto, consultarIngresoGasto, modificarIngresoGasto, crearFactura, getCodFactura, conectarGeneracion, obtenerDatosFactura}
