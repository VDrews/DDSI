<template>
  <div id="rrhh">
    <div class="display-1 font-weight-bold mt-6 mb-2">Contratar Empleado</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevoEmpleado.dni" placeholder="DNI" outlined></v-text-field>
      <v-text-field v-model="nuevoEmpleado.nombre" placeholder="Nombre" outlined></v-text-field>
      <v-text-field v-model="nuevoEmpleado.apellidos" placeholder="Apellidos" outlined></v-text-field>
      <v-text-field v-model="nuevoEmpleado.sueldo" :rules="[sueldoCorrecto]" placeholder="Sueldo" type="number" outlined suffix="€"></v-text-field>
    </div>

    <v-alert v-if="success.contratarEmpleado" text type="success">Empleado creado con éxito</v-alert>
    <v-alert v-if="error.contratarEmpleado" text type="error">Ya existe un empleado con este DNI</v-alert>
    <v-btn @click="contratar" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Contratar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Dar de baja Empleado</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="baja.dni" placeholder="DNI" outlined></v-text-field>
    </div>
    <v-alert v-if="success.baja" text type="success">Se ha dado de baja correctamente</v-alert>
    <v-alert v-if="error.baja" text type="error">Error al dar de baja al empleado</v-alert>
    <v-btn @click="darDeBaja" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Dar de Baja</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Modificar Empleado</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="empleadoModificar.dni" placeholder="DNI" outlined></v-text-field>
      <v-text-field v-model="empleadoModificar.nombre" placeholder="Nombre" outlined></v-text-field>
      <v-text-field v-model="empleadoModificar.apellidos" placeholder="Apellidos" outlined></v-text-field>
      <v-text-field v-model="empleadoModificar.numero" placeholder="Numero de Contrato" outlined></v-text-field>
      <v-text-field v-model="empleadoModificar.sueldo" :rules="[sueldoCorrecto]" placeholder="Sueldo" type="number" outlined suffix="€"></v-text-field>
    </div>
    <v-alert v-if="success.modificarEmpleado" text type="success">Empleado modificado con éxito</v-alert>
    <v-alert v-if="error.modificarEmpleado" text type="error">No existe un empleado con este DNI</v-alert>
    <v-btn @click="modificar" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Modificar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar Empleado</div>
    <div style="max-width: 900px; margin: 0 auto">
    <v-text-field v-model="dniEmpleadoConsultar" placeholder="DNI del Empleado" outlined></v-text-field>
    </div>
    <v-btn @click="consultar" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Consultar</v-btn>
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
const url = `https://apeteporica.herokuapp.com`

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

    sueldoCorrecto: (value) => value > 0 ? true : "El sueldo debe ser mayor de 0",
    notEmpty: (value) => value.length != 0 ? true : "Este campo no puede estar vacío",

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
        await axios.post(`${url}/api/empleado`, this.nuevoEmpleado)
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
        await axios.delete(`${url}/api/empleado/${this.baja.dni}`)
        this.success.baja = true

      } catch (err) {
        this.error.baja = true
      }

    },
    async consultar() {
      this.error.consultarEmpleado = false
      try {
        this.empleado = (await axios.get(`${url}/api/empleado/${this.dniEmpleadoConsultar}`)).data
        console.log(this.empleado)

      } catch(err) {
        this.error.consultarEmpleado = true

      }

    },

    async modificar() {
      this.success.modificarEmpleado = false
      this.error.modificarEmpleado = false

      try {
        await axios.put(`${url}/api/empleado/${this.empleadoModificar.dni}`, this.empleadoModificar)
        this.success.modificarEmpleado = true
      } catch(err) {
        this.error.modificarEmpleado = true
      }

    },
  }
}
</script>