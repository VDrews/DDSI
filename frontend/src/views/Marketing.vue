<template>
  <div id="marketing">
    <div class="display-1 font-weight-bold mt-6 mb-2">Crear campaña</div>
    <v-text-field v-model="campanya.nombre" placeholder="Nombre" outlined></v-text-field>
    <v-text-field v-model="campanya.coste" placeholder="Coste" type="number" outlined></v-text-field>
    <v-text-field v-model="campanya.canales" placeholder="Canales" outlined></v-text-field>
    <v-text-field v-model="campanya.media_url" placeholder="Media URL" outlined></v-text-field>
    <v-alert v-if="success.crearCampanya" text type="success">La campaña se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearCampanya" text type="error">Ya existe una campaña con este nombre</v-alert>
    <v-btn @click="crearCampanya" color="primary" dark block>Crear</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Asociar una campaña a un producto</div>
    <v-text-field v-model="anuncio.ean" placeholder="EAN" type="number" outlined></v-text-field>
    <v-text-field v-model="anuncio.nombre" placeholder="Nombre" outlined></v-text-field>
    <v-text-field v-model="anuncio.descuento" placeholder="Descuento" type="number" outlined></v-text-field>
    <v-alert v-if="success.asociarCampanya" text type="success">La campaña se ha asociado con éxito</v-alert>
    <v-alert v-if="error.asociarCampanya" text type="error">La campaña o el producto no existen</v-alert>
    <v-btn @click="asociarCampanya" color="primary" dark block>Asociar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Crear un evento analítico</div>
    <v-text-field v-model="nuevaAnalitica.id" placeholder="ID" type="number" outlined></v-text-field>
    <v-text-field v-model="nuevaAnalitica.nombre" placeholder="Nombre de Campaña" outlined></v-text-field>
    <v-text-field v-model="nuevaAnalitica.tipo" placeholder="Tipo" outlined></v-text-field>
    <v-text-field v-model="nuevaAnalitica.payload" placeholder="Payload" outlined></v-text-field>
    <v-alert v-if="success.crearAnalitica" text type="success">La analítica se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearAnalitica" text type="error">Ya existe una analítica con este id o no existe la campaña con ese nombre</v-alert>
    <v-btn @click="crearAnalitica" color="primary" dark block>Crear</v-btn>
    

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar analítica</div>
    <v-text-field v-model="idAnalitica" placeholder="ID" type="number" outlined></v-text-field>
    <v-btn @click="consultarAnalitica" color="primary" dark block>Consultar</v-btn>
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

const url = process.env.PRODUCTION ? `https://apeteporica.herokuapp.com` : 'http://localhost:8080'
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