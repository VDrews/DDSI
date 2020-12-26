<template>
  <div id="marketing">
    <div class="display-1 font-weight-bold mt-6 mb-2">Anotar Ingreso</div>
    <v-text-field v-model="nuevoIngreso.cantidad" placeholder="Cantidad" type="number" outlined></v-text-field>
    <v-text-field v-model="nuevoIngreso.tipo" placeholder="Tipo" outlined></v-text-field>
    <v-alert v-if="success.ingreso" text type="success">Se ha anotado el ingreso con éxito</v-alert>
    <v-alert v-if="error.ingreso" text type="error">No se ha podido anotar el ingreso</v-alert>
    <v-btn @click="anotarIngreso" color="primary" dark block>Anotar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Modificar Ingreso</div>
    <v-text-field v-model="ingresoModificado.codigo" placeholder="Codigo" type="number" outlined></v-text-field>
    <v-text-field v-model="ingresoModificado.cantidad" placeholder="Cantidad" outlined></v-text-field>
    <v-text-field v-model="ingresoModificado.tipo" placeholder="Tipo" outlined></v-text-field>
    <v-alert v-if="success.modificarIngreso" text type="success">El ingreso ha sido modificado con éxito</v-alert>
    <v-alert v-if="error.modificarIngreso" text type="error">No existe el ingreso con el código indicado</v-alert>
    <v-btn @click="modificarIngreso" color="primary" dark block>Crear</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar Ingreso</div>
    <v-text-field v-model="codigoIngreso" placeholder="Codigo" type="number" outlined></v-text-field>
    <v-btn @click="consultarIngreso" color="primary" dark block>Consultar</v-btn>
    <v-alert v-if="error.consultarIngreso" text type="error">No existe un ingreso con este código</v-alert>
    <v-simple-table v-if="ingreso">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Ingreso
            </th>
            <th class="text-left">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, name) in ingreso"
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
export default {
  data: () => ({
    nuevoIngreso: {
      tipo: "",
      cantidad: null,
    },
    codigoIngreso: null,
    ingresoModificado: {
      codigo: null,
      tipo: "",
      cantidad: null,
    },
    ingreso: null,

    success: {
      anotarIngreso: false,
      modificarIngreso: false,
    },

    error: {
      anotarIngreso: false,
      modificarIngreso: false,
      consultarProducto: false
    }
  }),

  methods: {
    async anotarIngreso() {
      this.success.anotarIngreso = false
      this.error.anotarIngreso = false

      try {
        await axios.post('http://localhost:8000/ingreso', this.campanya)
        this.success.anotarIngreso = true
      }
      catch(err) {
        this.error.anotarIngreso = false
      }

    },
    async modificarIngreso() {
      this.success.modificarIngreso = false
      this.error.modificarIngreso = false
      try {
        await axios.put('http://localhost:8000/ingreso', this.nuevoProducto)
        this.success.modificarIngreso = true

      } catch (err) {
        this.error.modificarIngreso = true
      }

    },
    async consultarIngreso() {
      this.error.consultarIngreso = false
      try {
        this.ingreso = (await axios.get(`http://localhost:8000/producto/${this.codigoIngreso}`)).data

      } catch(err) {
        this.error.consultarIngreso = true

      }

    },

  }
}
</script>