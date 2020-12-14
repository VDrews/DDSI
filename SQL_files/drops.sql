--use DDSI;

SET FOREIGN_KEY_CHECKS = 0

SELECT concat('DROP TABLE IF EXISTS `', table_name, '`;')
FROM information_schema.tables
WHERE table_schema = 'DDSI';

SET FOREIGN_KEY_CHECKS = 1


/* drop table Producto;
drop table Campanya;
drop table Anuncio;
drop table Inventario;
drop table Almacen;
drop table Analitica;
drop table Contenido;
drop table Envio;
drop table Distribucion;
drop table Remision;
drop table Factura;
drop table CompraVenta;
drop table Cliente;
drop table Informe;
drop table Fabricant;
drop table Transaccion;
drop table Creacion;
drop table Generacion;
drop table Paquete;

drop table Cargo;
drop table Emision;
drop table Cuenta_Empresa; */