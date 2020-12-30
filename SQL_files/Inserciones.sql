insert into Producto (EAN_producto, nombre, fabricante, precio) values
    (56847, '3060 Ti', 'Nvidia', 1099), 
    (82151, '6800', 'AMD', 600),
    (67961, '3070', 'Nvidia', 500),
    (66391, '3080', 'Nvidia', 1500),
    (99901, 'Tarjeta WiFi', 'TP-Link', 30),
    (70336, 'Televisor CX', 'LG', 1500),
    (77840, 'PS5', 'Sony', 499),
    (97117, 'Series X', 'Microsoft', 419),
    (49107, 'Switch', 'Nintendo', 320),
    (13012, 'XPS 13', 'Dell', 1200);


insert into Campanya (nombre, fecha, coste, canales, media_url) values
    ('Espectacular campaña numero 1', Now(), 100, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 2', Now(), 200, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 3', Now(), 300, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 4', Now(), 400, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 5', Now(), 500, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 6', Now(), 600, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 7', Now(), 700, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 8', Now(), 800, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 9', Now(), 900, 'DDSInstagram', 'pradocaido2021.ugr.es'),
    ('Espectacular campaña numero 10', Now(),1000, 'DDSInstagram', 'pradocaido2021.ugr.es');


insert into Anuncio(EAN_producto, nombre, descuento) values
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        10
    ),
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        20
    ),
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        30
    ),
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        40
    ),
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        50
    );

insert into Almacen(direccion) values
    ('C/Prueba 1, 28000 Madrí'),
    ('C/Prueba 2, 28000 Madrí'),
    ('C/Prueba 3, 28000 Madrí'),
    ('C/Prueba 4, 28000 Madrí'),
    ('C/Prueba 5, 28000 Madrí'),
    ('C/Prueba 6, 28000 Madrí'),
    ('C/Prueba 7, 28000 Madrí'),
    ('C/Prueba 8, 28000 Madrí'),
    ('C/Prueba 9, 28000 Madrí'),
    ('C/Prueba 10, 28000 Madrí');
    
insert into Analitica (ID, nombre, tipo, payload) values
    (2, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (3, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (4, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (5, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (1, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (6, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (7, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (8, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (9, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads'),
    (10, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads');


insert into Inventario (codigo_alm, EAN_producto, cantidad, estado, cant_afectada) values
    (11, 82151, 2, 'reservados', 0),
    (1, 82151, 2, 'reservados', 0),
    (21, 70336, 1, 'defectuosos', 0),
    (31, 99901, 3, 'reservados', 0),
    (41, 49107, 1, 'defectuosos', 0),
    (51, 77840, 999, 'reservados', 0);


insert into Paquete (transportista) values
    ('Seur'),
    ('Correos'),
    ('GLSL'),
    ('MRW'),
    ('UPS'),
    ('TNT'),
    ('Envialia'),
    ('ASM'),
    ('Seur otra vez'),
    ('Correos de nuevo porque no se me ocurre nada');

update Inventario set estado='Un estado cualquiera', cant_afectada=1
          where EAN_producto=82151 and codigo_alm=1;

insert into Contenido (ID_paquete, EAN_producto, cantidad) values
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1),
        (SELECT FLOOR(RAND()*(20-5+1)+5))
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1),
        (SELECT FLOOR(RAND()*(20-5+1)+5))
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1),
        (SELECT FLOOR(RAND()*(20-5+1)+5))
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1),
        (SELECT FLOOR(RAND()*(20-5+1)+5))
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1),
        (SELECT FLOOR(RAND()*(20-5+1)+5))
    );


insert into Factura values
    (null),
    (null),
    (null),
    (null),
    (null),
    (null),
    (null),
    (null),
    (null),
    (null);


insert into CompraVenta (cod_factura, ID_paquete, tipo) values
    (
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1), 
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        'Compra'
    ),
    (
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1), 
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        'Compra'
    ), 
    (
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1), 
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        'Compra'
    ), 
    (
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1), 
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        'Venta'
    ), 
    (
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1), 
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        'Venta'
    );


insert into Cliente(nombre_usuario, direccion) values
    ('progamer777', 'calle inventá 1'),
    ('Juan', 'calle inventá 2'),
    ('Chemón', 'calle inventá 3'),
    ('Asmileh', 'calle inventá 4'),
    ('Matias_prats', 'calle inventá 5'),
    ('TechJesus', 'calle inventá 6'),
    ('LinusTechTips', 'calle inventá 7'),
    ('Pikachu', 'calle inventá 8'),
    ('Doraemon', 'calle inventá 9'),
    ('El_teletubby_rojo', 'calle inventá 10');


insert into Envio (ID, fecha_envio, fecha_llegada, nombre_usuario) values
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 3 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 4 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 5 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 6 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 7 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 8 DAY),
        (SELECT nombre_usuario FROM Cliente ORDER BY RAND() LIMIT 1)
    );



insert into Informe (fecha, tipo, cantidad) values
    (Now(), 'Venta', 1),
    (Now(), 'Compra', 2),
    (Now(), 'Venta', 3),
    (Now(), 'Compra', 5),
    (Now(), 'Venta', 4),
    (Now(), 'Compra', 66),
    (Now(), 'Venta', 5435),
    (Now(), 'Compra', 667),
    (Now(), 'Venta', 24),
    (Now(), 'Compra', 90);
    


insert into Distribucion(ID_paquete, fecha_envio, fecha_llegada, cod_almacen) value
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 1 DAY),
        (SELECT codigo FROM Almacen ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 2 DAY),
        (SELECT codigo FROM Almacen ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 3 DAY),
        (SELECT codigo FROM Almacen ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 5 DAY),
        (SELECT codigo FROM Almacen ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 7 DAY),
        (SELECT codigo FROM Almacen ORDER BY RAND() LIMIT 1)
    );


insert into Fabricante (direccion) values
    ('Calle apetecán 1'),
    ('Calle apetecán 2'),
    ('Calle apetecán 3'),
    ('Calle apetecán 4'),
    ('Calle apetecán 5'),
    ('Calle apetecán 6'),
    ('Calle apetecán 7'),
    ('Calle apetecán 8'),
    ('Calle apetecán 9'),
    ('Calle apetecán 10');


insert into Remision (ID_paquete, fecha_envio, fecha_llegada, CIF) values
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 1 DAY),
        (SELECT CIF FROM Fabricante ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 2 DAY),
        (SELECT CIF FROM Fabricante ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 3 DAY),
        (SELECT CIF FROM Fabricante ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 4 DAY),
        (SELECT CIF FROM Fabricante ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT ID_paquete FROM Paquete ORDER BY RAND() LIMIT 1), 
        Now(),
        DATE_ADD(Now(), interval 5 DAY),
        (SELECT CIF FROM Fabricante ORDER BY RAND() LIMIT 1)
    );

insert into Transaccion(tipo, cantidad) values
    ('Ingreso', 1),
    ('Ingreso', 2),
    ('Ingreso', 3),
    ('Ingreso', 4),
    ('Ingreso', 5),
    ('Ingreso', 6),
    ('Gasto', 6),
    ('Gasto', 7),
    ('Gasto', 8),
    ('Gasto', 9);


insert into Creacion (codigo_tr, codigo_inf) values
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT codigo FROM Informe ORDER BY RAND() LIMIT 1)      
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT codigo FROM Informe ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT codigo FROM Informe ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT codigo FROM Informe ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT codigo FROM Informe ORDER BY RAND() LIMIT 1)
    );


insert into Generacion (codigo_tr, codigo_fac) values
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1)
    ),
    (
        (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1), 
        (SELECT cod_factura FROM Factura ORDER BY RAND() LIMIT 1)
    );

insert into Contrato(DNI, turno, fecha, vigente, sueldo) values
    ((SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1), 'L-V 16:30-19:30', Now(), true, 2000),
    ((SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1), 'L-V 16:30-19:30', Now(), true, 1200),
    ((SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1), 'L-V 16:30-19:30', Now(), true, 900),
    ((SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1), 'L-V 16:30-19:30', Now(), true, 1300),
    ((SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1), 'L-V 16:30-19:30', Now(), true, 1700);

insert into Empleado(DNI, nombre, apellidos) values
    (39726794, 'Pepe', 'Rodrigo'),
    (50824462, 'Juan', 'Serrano'),
    (29550027, 'Pablo', 'Alcala'),
    (52750714, 'Carlota', 'Prat'),
    (38757856, 'Adrián', 'Conde'),
    (02165686, 'Andrés', 'Barrios'),
    (75027165, 'El otro Andrés', 'Mayor'),
    (72508596, 'María', 'Caceres'),
    (85152596, 'Jose', 'Alcaraz'),
    (76042897, 'Sergio', 'Ramos'),
    (17375217, 'Pepe Luis', 'Jordan');

insert into Cobro (cod_nomina, DNI) values
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1));
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT DNI FROM Empleado ORDER BY RAND() LIMIT 1));

insert into Nomina (fecha, cuantia) values
    (DATE_ADD(Now(), interval 1 DAY), 10),
    (DATE_ADD(Now(), interval 1 DAY), 20),
    (DATE_ADD(Now(), interval 2 DAY), 30),
    (DATE_ADD(Now(), interval 3 DAY), 40),
    (DATE_ADD(Now(), interval 4 DAY), 50),
    (DATE_ADD(Now(), interval 2 DAY), 60),
    (DATE_ADD(Now(), interval 5 DAY), 80),
    (DATE_ADD(Now(), interval 1 DAY), 90),
    (DATE_ADD(Now(), interval 2 DAY), 70),
    (DATE_ADD(Now(), interval 3 DAY), 1000);

insert into Cuenta_Empresa (IBAN, BIC) values
    (123456789134, 'BBXXX');

insert into Emision (cod_nomina, IBAN) values
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1)),
    ((SELECT cod_nomina FROM Nomina ORDER BY RAND() LIMIT 1), (SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1));

insert into Cargo (IBAN, codigo_tr) values
    ((SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1), (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1)),
    ((SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1), (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1)),
    ((SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1), (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1)),
    ((SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1), (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1)),
    ((SELECT IBAN FROM Cuenta_Empresa ORDER BY RAND() LIMIT 1), (SELECT codigo_tr FROM Transaccion ORDER BY RAND() LIMIT 1));
