// nombre de usuario en Transacción
// los enumerados van entre ''?
// en el update hay que poner ; ?
// para generar factura es necesario poder agrupar el código de la factura, el tipo, nombre de usuario y cantidad
// entonces con eso se haría un select y se escribiría en "papel"
// nombre usuario requisito funcional 4.2
// y cómo seleccionamos el código de factura?!

let anotarIngresoGasto =  function(tipo, cantidad) {
  return `insert into Transaccion (tipo, cantidad) values (${tipo}, ${cantidad});`
}

// La otra opción sería buscar por el cod_transacción y cambiar el requisito f.
let consultarIngresoGasto = function(nombre_usuario) {
	return `select tipo, cantidad from Transaccion where codigo_tr in (select codigo_Tr from Generacion where codigo_fac in (select cod_factura from CompraVenta where ID_paquete in (select ID from Envio where nombre_usuario = '${nombre_usuario}')))  `
} 

let modificarIngresoGasto = function(codigo_tr, tipo, cantidad) {
	return `update Transaccion set tipo = ${tipo}, cantidad = ${cantidad} where codigo_tr = ${codigo_tr};`
}

// select?
let generarFactura = function(codigo_tr) {
	return (`insert into Generacion (codigo_tr) values (${codigo_tr});`; `select tipo, cantidad from Transacción where codigo_tr = ${codigo_tr}`)
}



`select tipo, cantidad from Transacción where codigo_tr = ${codigo_tr}`



module.exports = {anotarIngresoGasto, consultarIngresoGasto, modificarIngresoGasto}
