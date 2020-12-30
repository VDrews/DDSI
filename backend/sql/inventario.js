let addAlmacen = function ({direccion}) {
  return `insert into Almacen (direccion) values ('${direccion}');`
}

let defineEstado = function ({ean, codigo_alm, estado, cantidad}){
  return `update Inventario set estado='${estado}', cant_afectada=${cantidad}
          where ean_producto=${ean} and codigo_alm=${codigo_alm};`
}

let newInventario = function({codigo_alm, ean, cantidad}) {
  return `insert into Inventario (codigo_alm, ean_producto, cantidad) values
            (${codigo_alm}, ${ean}, ${cantidad})
          on duplicate key update cantidad = cantidad + ${cantidad};`
}

let eliminarStock = function({ean, almacen}){
  return `delete from Inventario where ean_producto=${ean} and codigo_alm=${almacen};`
}



module.exports = {addAlmacen, defineEstado, newInventario, eliminarStock}