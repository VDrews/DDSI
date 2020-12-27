let actualizarInventario = function({ean, almacen, cantidad}) {
  return `update Inventario set cantidad=cantidad+${cantidad} where ean_producto=${ean} and codigo_alm=${almacen};`
}

let addAlmacen = function ({direccion}) {
  return `insert into Almacen (direccion) values ('${direccion}');`
}

let defineEstado = function ({ean, almacen, estado, cantafectada}){
  return `update Inventario set estado='${estado}' set cant_afectada=${cantafectada}
          where ean_producto=${ean} and cod_almacen=${almacen};`
}

let newInventario = function({almacen, ean, cantidad}) {
  return `insert into Inventario (codigo_alm, ean_producto, cantidad) values
          (${almacen}, ${ean}, ${cantidad});`
}

let dropProducto = function({ean}){
  return `delete from Producto where ean_producto=${ean};`
}

let eliminarStock = function({ean, almacen}){
  return `delete from Inventario where ean_producto=${ean} and codigo_alm=${almacen};`
}



module.exports = {actualizarInventario, addAlmacen, defineEstado, newInventario, dropProducto, eliminarStock}