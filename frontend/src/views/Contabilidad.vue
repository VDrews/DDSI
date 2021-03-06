<template>
  <div id="contabilidad">
    <div class="display-1 font-weight-bold mt-6 mb-2">Anotar Ingreso</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevoIngreso.cantidad" :rules="[cantidadPos]" placeholder="Cantidad" type="number" outlined suffix="€">></v-text-field>
      <v-select v-model="nuevoIngreso.tipo" :rules="[notEmpty]" :items="tiposIngreso" placeholder="Tipo" outlined></v-select>
    </div>
    <v-alert v-if="success.anotarIngreso" text type="success">Se ha anotado el ingreso con éxito</v-alert>
    <v-alert v-if="error.anotarIngreso" text type="error">No se ha podido anotar el ingreso</v-alert>
    <v-btn @click="anotarIngreso" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Anotar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Modificar Ingreso</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="ingresoModificado.codigo" :rules="[notEmpty]" placeholder="Codigo" type="number" outlined></v-text-field>
      <v-text-field v-model="ingresoModificado.cantidad" :rules="[cantidadPos, notEmpty]" placeholder="Cantidad" outlined suffix="€">></v-text-field>
      <v-select v-model="ingresoModificado.tipo" :items="tiposIngreso" :rules="[notEmpty]" placeholder="Tipo" outlined></v-select>
    </div>
    <v-alert v-if="success.modificarIngreso" text type="success">El ingreso ha sido modificado con éxito</v-alert>
    <v-alert v-if="error.modificarIngreso" text type="error">No existe el ingreso con el código indicado</v-alert>
    <v-btn @click="modificarIngreso" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Modificar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar Factura</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="codigoFactura" :rules="[notEmpty]" placeholder="Codigo Factura" type="number" outlined></v-text-field>
    </div>
    <v-btn @click="consultarFactura" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Consultar</v-btn>
    <v-alert v-if="error.consultarFactura" text type="error">No existe una factura con este código</v-alert>
    <v-simple-table v-if="factura">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Factura
            </th>
            <th class="text-left">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, name) in factura"
            :key="name"
          >
            <td>{{name}}</td>
            <td>{{value}}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar Ingreso</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="codigoIngreso" :rules="[notEmpty]" placeholder="Nombre de Usuario" outlined></v-text-field>
    </div>
    <v-btn @click="consultarIngreso" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Consultar</v-btn>
    <v-alert v-if="error.consultarIngreso" text type="error">No existen ingresos de ese usuario</v-alert>
    <v-list>
      <v-list-item v-for="(ingreso, i) in ingresos" :key="i">
        <v-list-item-title>{{ingreso.cantidad}}</v-list-item-title>
        <v-list-item-action>{{ingreso.tipo}}</v-list-item-action>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
import axios from 'axios'
const url = `https://apeteporica.herokuapp.com`

export default {
  data: () => ({
    nuevoIngreso: {
      tipo: "",
      cantidad: null,
    },
    tiposIngreso: ['Ingreso', 'Gasto'],
    codigoIngreso: null,
    codigoFactura: null,
    ingresoModificado: {
      codigo: null,
      tipo: "",
      cantidad: null,
    },
    ingresos: [],

    factura: null,

    success: {
      anotarIngreso: false,
      modificarIngreso: false,
    },

    cantidadPos: (value) => value > 0 ? true : "La cantidad debe ser mayor que 0",
    notEmpty: (value) => value.length != 0 ? true : "Este campo no puede estar vacío",

    error: {
      anotarIngreso: false,
      modificarIngreso: false,
      consultarProducto: false,
      consultarFactura: false
    }
  }),

  methods: {
    async anotarIngreso() {
      this.success.anotarIngreso = false
      this.error.anotarIngreso = false

      try {
        await axios.post(`${url}/api/ingreso`, this.nuevoIngreso)
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
        await axios.put(`${url}/api/ingreso/${this.ingresoModificado.codigo}`, this.ingresoModificado)
        this.success.modificarIngreso = true

      } catch (err) {
        this.error.modificarIngreso = true
      }

    },
    async consultarIngreso() {
      this.ingresos = [];
      this.error.consultarIngreso = false
      try {
        this.ingresos = (await axios.get(`${url}/api/ingreso/${this.codigoIngreso}`)).data

      } catch(err) {
        this.error.consultarIngreso = true

      }

    },

    async consultarFactura() {
      console.log(this.codigoFactura)
      this.error.consultarFactura = false
      try {
        this.factura = (await axios.get(`${url}/api/factura/${this.codigoFactura}`)).data

      } catch(err) {
        this.error.consultarFactura = true

      }

    },

  }
}
</script>