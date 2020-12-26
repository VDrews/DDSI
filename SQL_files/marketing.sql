-- Crear campaña de marketing
insert into Campanya (nombre, fecha, coste, canales, media_url) values
    ('Espectacular campaña numero 1', Now(), 100, 'DDSInstagram', 'pradocaido2021.ugr.es');
-- Consultar una campaña
select * from Campanya where nombre == ''
-- Crear un producto
insert into Producto (EAN_producto, nombre, fabricante, precio) values
    (56847, '3060 Ti', 'Nvidia', 1099);

-- Consultar un producto
select * from Producto where EAN_producto = ''

-- Asociar una campaña a un producto
insert into Anuncio(EAN_producto, nombre, descuento) values
    (
        (SELECT EAN_producto FROM Producto ORDER BY RAND() LIMIT 1), 
        (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 
        10
    );

-- Crear un evento analitico
insert into Analitica (ID, nombre, tipo, payload) values
    (2, (SELECT nombre FROM Campanya ORDER BY RAND() LIMIT 1), 'NoMeSeElTipo', 'Niideadepayloads');

-- Consultar analítica
select * from Analitica where ID = ''
