let contratarEmpleado = function({dni, nombre, apellidos}) {
	return `insert into Empleado (dni, nombre, apellidos) values (${dni}, '${nombre}', '${apellidos}');`
}

let crearContrato = function({dni, sueldo}) {
	return `insert into Contrato (dni, fecha, vigente, sueldo) values (${dni}, Now(), true, ${sueldo});`
}

let darBajaEmpleado = function({dni}) {
	return `update Contrato set vigente = false where dni = ${dni};`
}


let modificarEmpleado = function({dni, nombre, apellidos}) {
	return `update Empleado set nombre = '${nombre}', apellidos = '${apellidos} where dni = ${dni};`
}

let modificarContrato = function({dni, sueldo, numero}) {
	return `update Contrato set sueldo = ${sueldo} where (dni = ${dni} and numero = ${numero} and vigente = true);`
}

let consultarEmpleado = function({dni}) {
	return `select dni, nombre, apellidos, numero, vigente, sueldo from Empleado NATURAL JOIN Contrato where dni = ${dni}`
}

module.exports = {contratarEmpleado, crearContrato, darBajaEmpleado, modificarEmpleado, modificarContrato, consultarEmpleado}
