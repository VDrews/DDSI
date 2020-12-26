


let crearCampanya = function({nombre, coste, canales, media_url}) {
  return `insert into Campanya (nombre, fecha, coste, canales, media_url) values
    ('${nombre}', Now(), ${coste}, '${canales}', '${media_url}');`
}

let consultarCampanya = function({nombre}) {
  return `select * from Campanya where nombre = '${nombre}'`
}

let crearProducto = function({ean, nombre, fabricante, precio}) {
  return `insert into Producto (EAN_producto, nombre, fabricante, precio) values
    (${ean}, '${nombre}', '${fabricante}', ${precio});`
}

let consultarProducto = function({ean}) {
  return `select * from Inventario NATURAL JOIN Producto where EAN_producto = '${ean}'`
  // return `select * from Producto NATURAL JOIN  where EAN_producto = '${ean}'`
}

let asociarCampanya = function({ean, nombre, descuento}) {
  return `insert into Anuncio(EAN_producto, nombre, descuento) values (${ean}, '${nombre}', ${descuento});`
}

let crearAnalitica = function({id, nombre, tipo, payload}) {
  return `insert into Analitica (ID, nombre, tipo, payload) values
    (${id}, '${nombre}', '${tipo}', '${payload}');`
}

let consultarAnalitica = function({id}) {
  return `select ID, tipo, Analitica.nombre AS campaña, payload, coste, canales, media_url from Analitica NATURAL JOIN Campanya where ID = ${id}`
}

module.exports = {crearCampanya, consultarCampanya, crearProducto, consultarProducto, asociarCampanya, crearAnalitica, consultarAnalitica}