<template>
  <div id="marketing">
    <div class="display-1 font-weight-bold mt-6 mb-2">Contratar Empleado</div>
    <v-text-field v-model="nuevoEmpleado.dni" placeholder="DNI" outlined></v-text-field>
    <v-text-field v-model="nuevoEmpleado.nombre" placeholder="Nombre" outlined></v-text-field>
    <v-text-field v-model="nuevoEmpleado.apellidos" placeholder="Apellidos" outlined></v-text-field>
    <v-text-field v-model="nuevoEmpleado.turno" placeholder="Turno" outlined></v-text-field>
    <v-text-field v-model="nuevoEmpleado.sueldo" placeholder="Sueldo" type="number" outlined></v-text-field>
    <v-alert v-if="success.contratarEmpleado" text type="success">Empleado creado con éxito</v-alert>
    <v-alert v-if="error.contratarEmpleado" text type="error">Ya existe un empleado con este DNI</v-alert>
    <v-btn @click="contratar" color="primary" dark block>Contratar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Dar de baja</div>
    <v-text-field v-model="baja.dni" placeholder="DNI" outlined></v-text-field>
    <v-alert v-if="success.baja" text type="success">Se ha dado de baja correctamente</v-alert>
    <v-alert v-if="error.baja" text type="error">Error al dar de baja al empleado</v-alert>
    <v-btn @click="darDeBaja" color="primary" dark block>Dar de Baja</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Modificar Empleado</div>
    <v-text-field v-model="empleadoModificar.dni" placeholder="DNI" outlined></v-text-field>
    <v-text-field v-model="empleadoModificar.nombre" placeholder="Nombre" outlined></v-text-field>
    <v-text-field v-model="empleadoModificar.apellidos" placeholder="Apellidos" outlined></v-text-field>
    <v-text-field v-model="empleadoModificar.numero" placeholder="Numero de Contrato" outlined></v-text-field>
    <v-text-field v-model="empleadoModificar.turno" placeholder="Turno" outlined></v-text-field>
    <v-text-field v-model="empleadoModificar.sueldo" placeholder="Sueldo" type="number" outlined></v-text-field>
    <v-alert v-if="success.modificarEmpleado" text type="success">Empleado creado con éxito</v-alert>
    <v-alert v-if="error.modificarEmpleado" text type="error">Ya existe un empleado con este DNI</v-alert>
    <v-btn @click="modificar" color="primary" dark block>Modificar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar un empleado</div>
    <v-text-field v-model="dniEmpleadoConsultar" placeholder="DNI del Empleado" outlined></v-text-field>
    <v-btn @click="consultar" color="primary" dark block>Consultar</v-btn>
    <v-alert v-if="error.consultarEmpleado" text type="error">No existe un empleado con este DNI</v-alert>
    <v-simple-table v-if="empleado">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Empleado
            </th>
            <th class="text-left">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, name) in empleado"
            :key="name"
          >
            <td>{{name}}</td>
            <td>{{value}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </div>
</template>

<script>
import axios from 'axios'
const port = process.env.PORT || 8080
export default {
  data: () => ({
    nuevoEmpleado: {
      dni: "", 
      nombre: "", 
      apellidos: "", 
      turno: "", 
      sueldo: null
    },
    empleadoModificar: {},
    baja: {
      dni: "",
      numero: null
    },
    dniEmpleadoConsultar: "",
    dniEmpleadoBaja: "",
    empleado: null,

    success: {
      contratarEmpleado: false,
      baja: false,
      modificarEmpleado: false,
    },

    error: {
      contratarEmpleado: false,
      baja: false,
      modificarEmpleado: false,
      consultarEmpleado: false,
    }
  }),

  methods: {
    async contratar() {
      this.success.contratarEmpleado = false
      this.error.contratarEmpleado = false

      try {
        await axios.post(`http://localhost:${port}/api/empleado`, this.nuevoEmpleado)
        this.success.contratarEmpleado = true
      }
      catch(err) {
        this.error.contratarEmpleado = false
      }

    },
    async darDeBaja() {
      this.success.baja = false
      this.error.baja = false
      try {
        console.log(this.baja.dni)
        await axios.delete(`http://localhost:${port}/api/empleado/${this.baja.dni}`)
        this.success.baja = true

      } catch (err) {
        this.error.baja = true
      }

    },
    async consultar() {
      this.error.consultarEmpleado = false
      try {
        this.empleado = (await axios.get(`http://localhost:${port}/api/empleado/${this.dniEmpleadoConsultar}`)).data
        console.log(this.empleado)

      } catch(err) {
        this.error.consultarEmpleado = true

      }

    },

    async modificar() {
      this.success.modificarEmpleado = false
      this.error.modificarEmpleado = false

      try {
        await axios.put(`http://localhost:${port}/api/empleado/${this.empleadoModificar.dni}`, this.empleadoModificar)
        this.success.modificarEmpleado = true
      } catch(err) {
        this.error.modificarEmpleado = true
      }

    },
  }
}
</script>