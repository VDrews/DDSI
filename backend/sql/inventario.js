/*let actualizarInventario = function({ean, codigo_alm, cantidad}) {
  return `update Inventario set cantidad=cantidad+${cantidad} where ean_producto=${ean} and codigo_alm=${codigo_alm};`
}*/

let addAlmacen = function ({direccion}) {
  return `insert into Almacen (direccion) values ('${direccion}');`
}

let defineEstado = function ({ean, codigo_alm, estado, cantafectada}){
  return `update Inventario set estado='${estado}' set cant_afectada=${cantafectada}
          where ean_producto=${ean} and cod_almacen=${codigo_alm};`
}

let newInventario = function({codigo_alm, ean, cantidad}) {
  return `insert into Inventario (codigo_alm, ean_producto, cantidad) values
            (${codigo_alm}, ${ean}, ${cantidad})
          on duplicate key update cantidad = cantidad + ${cantidad};`
}

let dropProducto = function({ean}){
  return `delete from Anuncio where ean_producto=${ean};
          delete from Inventario where ean_producto=${ean};
          delete from Contenido where ean_producto=${ean};
          delete from Producto where ean_producto=${ean};`
}

let eliminarStock = function({ean, almacen}){
  return `delete from Inventario where ean_producto=${ean} and codigo_alm=${almacen};`
}



module.exports = {addAlmacen, defineEstado, newInventario, dropProducto, eliminarStock}