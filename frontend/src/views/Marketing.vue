<template>
  <div id="marketing">
    <div class="display-1 font-weight-bold mt-6 mb-2">Crear campaña</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="campanya.nombre" :rules="[notEmpty]" placeholder="Nombre" outlined></v-text-field>
      <v-text-field v-model="campanya.coste" :rules="[costeCorrecto]" placeholder="Coste" type="number" outlined suffix="€">></v-text-field>
      <v-text-field v-model="campanya.canales" :rules="[notEmpty]" placeholder="Canales" outlined></v-text-field>
      <v-text-field v-model="campanya.media_url" :rules="[notEmpty, isUrl]" placeholder="Media URL" outlined></v-text-field>
    </div>
    <v-alert v-if="success.crearCampanya" text type="success">La campaña se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearCampanya" text type="error">Ya existe una campaña con este nombre</v-alert>
    <v-btn @click="crearCampanya" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Crear</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Asociar una campaña a un producto</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="anuncio.ean" :rules="[notEmpty]" placeholder="EAN" type="number" outlined></v-text-field>
      <v-text-field v-model="anuncio.nombre" :rules="[notEmpty]" placeholder="Nombre" outlined></v-text-field>
      <v-text-field v-model="anuncio.descuento" :rules="[notEmpty, isPercent]" placeholder="Descuento" type="number" outlined suffix="%">></v-text-field>
    </div>
    <v-alert v-if="success.asociarCampanya" text type="success">La campaña se ha asociado con éxito</v-alert>
    <v-alert v-if="error.asociarCampanya" text type="error">La campaña o el producto no existen</v-alert>
    <v-btn @click="asociarCampanya" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Asociar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Crear un evento analítico</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevaAnalitica.id" :rules="[notEmpty]" placeholder="ID" type="number" outlined></v-text-field>
      <v-text-field v-model="nuevaAnalitica.nombre" :rules="[notEmpty]" placeholder="Nombre de Campaña" outlined></v-text-field>
      <v-text-field v-model="nuevaAnalitica.tipo" :rules="[notEmpty]" placeholder="Tipo" outlined></v-text-field>
      <v-text-field v-model="nuevaAnalitica.payload" placeholder="Payload" outlined></v-text-field>
    </div>
    <v-alert v-if="success.crearAnalitica" text type="success">La analítica se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearAnalitica" text type="error">Ya existe una analítica con este id o no existe la campaña con ese nombre</v-alert>
    <v-btn @click="crearAnalitica" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Crear</v-btn>


    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar analítica</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="idAnalitica" placeholder="ID" type="number" outlined></v-text-field>
    </div>
    <v-btn @click="consultarAnalitica" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Consultar</v-btn>
    <v-alert v-if="error.consultarAnalitica" text type="error">La analítica no existe</v-alert>

    <v-simple-table v-if="analitica">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Analítica
            </th>
            <th class="text-left">
              Valor
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, name) in analitica"
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
    campanya: {
      nombre: "",
      coste: null,
      canales: "",
      media_url: ""
    },
    anuncio: {
      ean: "",
      nombre: "",
      descuento: null
    },
    nuevaAnalitica: {
      id: null,
      nombre: "",
      tipo: "",
      payload: ""
    },
    idAnalitica: null,
    analitica: null,

    success: {
      crearCampanya: false,
      asociarCampanya: false,
      crearAnalitica: false
    },

    costeCorrecto: (value) => value > 0 ? true : "El precio debe ser mayor de 0",
    notEmpty: (value) => value.length != 0 ? true : "Este campo no puede estar vacío",
    isPercent: (value) => value >= 0 && value <= 100 ? true : "El valor debe estar entre 0 y 100",
    isUrl: (value) => value.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi) ? true : "No es una URL válida",

    error: {
      crearCampanya: false,
      crearProducto: false,
      asociarCampanya: false,
      crearAnalitica: false,
      consultarAnalitica: false
    }
  }),

  methods: {
    async crearCampanya() {
      this.success.crearCampanya = false
      this.error.crearCampanya = false

      try {
        await axios.post(`${url}/api/campanya`, this.campanya)
        this.success.crearCampanya = true
      }
      catch(err) {
        this.error.crearCampanya = false
      }

    },
    async asociarCampanya() {
      this.success.asociarCampanya = false
      this.error.asociarCampanya = false

      try {
        await axios.post(`${url}/api/campanya/${this.anuncio.nombre}`, {
          ean: this.anuncio.ean,
          descuento: this.anuncio.descuento
        })
        this.success.asociarCampanya = true
      } catch(err) {
        this.error.asociarCampanya = true
      }

    },
    async crearAnalitica() {
      this.success.crearAnalitica = false
      this.error.crearAnalitica = false
      try {
        await axios.post(`${url}/api/analitica`, this.nuevaAnalitica)
        this.success.crearAnalitica = true

      } catch(err) {
        this.error.crearAnalitica = true

      }

    },
    async consultarAnalitica() {
      console.log(`${url}/api/analitica/${this.idAnalitica}`)
      this.error.consultarAnalitica = false
      try {
        this.analitica = (await axios.get(`${url}/api/analitica/${this.idAnalitica}`)).data

      } catch(err) {
        this.error.consultarAnalitica = true

      }

    },
  }
}
</script>