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
/*
// select?
let generarFactura = function(codigo_tr) {
	return `insert into Generacion (codigo_tr) values (${codigo_tr});`
}


`insert into Factura cod_factura values NULL`
//Falta saber cómo consigo el cod_facutra!!?
`insert into Generacion (cod_factura, codigo_tr) values (${cod_factura}, ${codigo_tr})`



`select tipo, cantidad from Transacción where codigo_tr = ${codigo_tr}`
`select codigo_fac from Generacion where codigo_tr = ${codigo_tr}`
`select nombre_usuario from envio where Id in (select id_paquete from CompraVenta where cod_factura in (select codigo_factura from Generacion where codigo_tr = ${codigo_tr}))`




`select tipo, cantidad, cod_factura, nombre_usuario from Transaccion Natural Join 
(select codigo_fac, nombre_usuario, codigo_tr from Generacion Natural Join 
(select nombre_usuario, codigo_fac from Envio Natural Join 
(select id_paquete, cod_factura from CompraVenta where cod_factura in 
(select codigo_factura from Generacion where codigo_tr = ${codigo_tr}))))`


/*
`select tipo, cantidad, nombre_usuario, cod_factura from Transaccion Natural Join 
( select nombre_usuario, cod_factura, codigo_tr from Generacion Natural Join 
( select nombre_usuario, cod_factura from Compraventa Natural Join (select nombre_usuario, ID from Envio) where cod_factura = ${cod_factura}) ))`
*/

*/
module.exports = {anotarIngresoGasto, consultarIngresoGasto, modificarIngresoGasto}
