use DDSI;
CREATE TABLE Producto (
  EAN_producto INT(13) NOT NULL PRIMARY KEY,
  nombre VARCHAR(50),
  fabricante VARCHAR(255),
  precio DECIMAL(10, 2) NOT NULL CHECK (precio > 0),
  oferta BOOLEAN,
  imagenes VARCHAR(255),
  opiniones VARCHAR(255)
);


CREATE TABLE Campanya (
  nombre VARCHAR(50) NOT NULL PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT NOW(),
  coste DECIMAL(10, 2) NOT NULL,
  canales VARCHAR(255),
  media_url VARCHAR(100)
);


CREATE TABLE Anuncio (
  EAN_producto INT(13) NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  descuento INT(2) CHECK (descuento > 0),
  FOREIGN KEY (EAN_producto) REFERENCES Producto(EAN_producto),
  FOREIGN KEY (nombre) REFERENCES Campanya(nombre),
  PRIMARY KEY (EAN_producto, nombre)
);


CREATE TABLE Almacen (
  codigo INT(13) AUTO_INCREMENT NOT NULL PRIMARY KEY, -- NOTE novedad
  direccion varchar(255)
);


CREATE TABLE Analitica (
  ID INT(13),
  nombre VARCHAR(50),
  tipo VARCHAR(255) NOT NULL,
  payload VARCHAR(255),
  FOREIGN KEY (nombre) REFERENCES Campanya(nombre),
  PRIMARY KEY (ID, nombre)
);

-- NOTE: Cantidad en almacén, estado y cant. afectada separados.
CREATE TABLE Inventario (
  codigo_alm INT(13) NOT NULL,
  EAN_producto INT(13) NOT NULL,
  cantidad INT(4),
  estado VARCHAR(255),
  cant_afectada INT (3),
  FOREIGN KEY (codigo_alm) REFERENCES Almacen(codigo),
  FOREIGN KEY (EAN_producto) REFERENCES Producto(EAN_producto),
  PRIMARY KEY (codigo_alm, EAN_producto)
);


CREATE TABLE Paquete (
  ID_paquete INT(13) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  transportista VARCHAR(50)
);


CREATE TABLE Contenido (
  ID_paquete INT(13) NOT NULL,
  EAN_producto INT(13) NOT NULL,
  cantidad INT(8) NOT NULL CHECK (Cantidad > 0),
  FOREIGN KEY (ID_paquete) REFERENCES Paquete(ID_paquete),
  FOREIGN KEY (EAN_producto) REFERENCES Producto(EAN_producto),
  PRIMARY KEY (ID_paquete, EAN_producto)
);


CREATE TABLE Factura (
  cod_factura INT(13) NOT NULL AUTO_INCREMENT PRIMARY KEY
);


CREATE TABLE CompraVenta (
  cod_factura INT(13) NOT NULL,
  ID_paquete INT(13) NOT NULL,
  tipo ENUM('Venta', 'Compra') NOT NULL,
  FOREIGN KEY (cod_factura) REFERENCES Factura(cod_factura),
  FOREIGN KEY (ID_paquete) REFERENCES Paquete(ID_paquete),
  PRIMARY KEY (cod_factura, ID_paquete)
);


CREATE TABLE Cliente (
  nombre_usuario VARCHAR(50) NOT NULL PRIMARY KEY,
  direccion VARCHAR(100)
);


CREATE TABLE Envio (
  ID INT(13) NOT NULL,
  fecha_envio DATE,
  fecha_llegada DATE,
  nombre_usuario VARCHAR(50),
  FOREIGN KEY (ID) REFERENCES Paquete(ID_paquete),
  FOREIGN KEY (nombre_usuario) REFERENCES Cliente(nombre_usuario),
  PRIMARY KEY (ID, fecha_envio, fecha_llegada)
);


CREATE TABLE Informe (
  codigo INT(13) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha DATETIME NOT NULL DEFAULT NOW(),
  tipo ENUM('Venta', 'Compra') NOT NULL,
  cantidad INT(8) CHECK (cantidad > 0)
);


CREATE TABLE Distribucion (
  ID_paquete INT(13) NOT NULL,
  fecha_envio DATE,
  fecha_llegada DATE CHECK (fecha_envio <= fecha_llegada),
  Cod_almacen INT(3) NOT NULL,
  FOREIGN KEY (ID_paquete) REFERENCES Paquete(ID_paquete),
  FOREIGN KEY (Cod_almacen) REFERENCES Almacen(codigo),
  PRIMARY KEY (ID_paquete, fecha_envio, fecha_llegada)
);


CREATE TABLE Fabricante(
  CIF INT(9) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  direccion VARCHAR(100)
);


CREATE TABLE Remision (
  ID_paquete INT(13) NOT NULL,
  fecha_envio DATE,
  fecha_llegada DATE CHECK (fecha_envio <= fecha_llegada),
  CIF INT(9) NOT NULL CHECK (CIF > 0),
  FOREIGN KEY (ID_paquete) REFERENCES Paquete(ID_paquete),
  FOREIGN KEY (CIF) REFERENCES Fabricante(CIF),
  PRIMARY KEY (ID_paquete, fecha_envio, fecha_llegada)
);


CREATE TABLE Transaccion (
  codigo_tr INT(13) AUTO_INCREMENT PRIMARY KEY,
  tipo ENUM('Ingreso', 'Gasto'),
  cantidad INT(8) CHECK (cantidad > 0)
);


CREATE TABLE Creacion (
  codigo_tr INT(13) PRIMARY KEY,
  codigo_inf INT(13) NOT NULL,
  FOREIGN KEY (codigo_tr) REFERENCES Transaccion(codigo_tr),
  FOREIGN KEY (codigo_inf) REFERENCES Informe(codigo)
);


CREATE TABLE Generacion (
  codigo_tr INT(13) PRIMARY KEY,
  codigo_fac INT(13) NOT NULL,
  FOREIGN KEY (codigo_tr) REFERENCES Transaccion(codigo_tr),
  FOREIGN KEY (codigo_fac) REFERENCES Factura(cod_factura)
);


CREATE TABLE Empleado(
  DNI INT(9) NOT NULL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellidos VARCHAR(60) NOT NULL
);

CREATE TABLE Contrato(
  DNI INT(9) NOT NULL,
  numero INT(2) AUTO_INCREMENT,
  turno VARCHAR(255),
  fecha DATETIME NOT NULL DEFAULT NOW(),
  vigente BOOLEAN DEFAULT true,
  sueldo DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (DNI) REFERENCES Empleado(DNI),
  PRIMARY KEY (numero, DNI)
);


CREATE TABLE Nomina(
  cod_nomina INT(13) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fecha DATE,
  cuantia DECIMAL(10, 2) NOT NULL
);


CREATE TABLE Cobro(
  cod_nomina INT(13) PRIMARY KEY,
  DNI INT(9),
  FOREIGN KEY (cod_nomina) REFERENCES Nomina(cod_nomina),
  FOREIGN KEY (DNI) REFERENCES Empleado(DNI)
);


CREATE TABLE Cuenta_Empresa(
  IBAN VARCHAR(20) NOT NULL PRIMARY KEY,
  BIC VARCHAR(8)
);


CREATE TABLE Emision(
  cod_nomina INT(13) NOT NULL PRIMARY KEY,
  IBAN VARCHAR(20),
  FOREIGN KEY (cod_nomina) REFERENCES Nomina(cod_nomina),
  FOREIGN KEY (IBAN) REFERENCES Cuenta_Empresa(IBAN)
);


CREATE TABLE Cargo(
  IBAN VARCHAR(20),
  codigo_tr INT(13) PRIMARY KEY,
  FOREIGN KEY (IBAN) REFERENCES Cuenta_Empresa(IBAN),
  FOREIGN KEY (codigo_tr) REFERENCES Transaccion(codigo_tr)
);