
let contratarEmpleado = function({dni, nombre, apellidos, sueldo}) {
	return (`insert into Empleado (dni, nombre, apellidos) values (${dni}, '${nombre}', '${apellidos}');`; `insert into Contrato (dni, numero, turno, fecha, vigente, sueldo) values (${dni}, , , Now(), true, ${sueldo});`)

}



/*
let darBajaEmpleado = function({dni}) {
	return `insert into (select dni, vigente from Contrato where dni = ${dni}) and vigente = false (vigente) values (false);`
}*/

let darBajaEmpleado = function({dni}) {
	return `update Contrato set vigente = false where dni = ${dni};`
}


// DUDAS: número de contrato, hay que buscar que sea vigente??
// cuando no es un string hay que poner '${}' o solo ${}
// los true/False hay que ponerlos con comillas?
// Como poner en contratar el número
// Como poner en contratar el turno y la fecha

let modificarEmpleado = function({dni, nombre, apellidos, sueldo, numero}) {
	return (`update Empleado set nombre = '${nombre}', apellidos = '${apellidos} where dni = ${dni};`;  `update Contrato set sueldo = ${sueldo} where (dni = ${dni} and numero = ${numero} and vigente = true);`)
}


let consultarEmpleado = function({dni}) {
	return `select dni, nombre, apellidos, numero, vigente, sueldo from Empleado NATURAL JOIN Contrato where dni = ${dni}`
}

module.exports = {contratarEmpleado, darBajaEmpleado, modificarEmpleado, consultarEmpleado}
