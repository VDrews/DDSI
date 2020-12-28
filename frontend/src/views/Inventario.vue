<template>
  <div id="marketing">
    <div class="display-1 font-weight-bold mt-6 mb-2">Crear un producto</div>
    <v-text-field v-model="nuevoProducto.ean" placeholder="EAN" type="number" outlined></v-text-field>
    <v-text-field v-model="nuevoProducto.nombre" placeholder="Nombre" outlined></v-text-field>
    <v-text-field v-model="nuevoProducto.fabricante" placeholder="Fabricante" outlined></v-text-field>
    <v-text-field v-model="nuevoProducto.precio" placeholder="Precio" type="number" outlined></v-text-field>
    <v-alert v-if="success.crearProducto" text type="success">El producto se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearProducto" text type="error">Ya existe un producto con este EAN</v-alert>
    <v-btn @click="crearProducto" color="primary" dark block>Crear</v-btn>
    
    <div class="display-1 font-weight-bold mt-6 mb-2">Cambiar cantidad en almacén</div>
    <v-text-field v-model="cambioCantidad.ean" placeholder="EAN" type="number" outlined></v-text-field>
    <v-text-field v-model="cambioCantidad.cantidad" placeholder="Cantidad" type="number" outlined></v-text-field>
    <v-text-field v-model="cambioCantidad.codigo_alm" placeholder="Código de Almacen" type="number" outlined></v-text-field>
    <v-alert v-if="success.cambiarCantidad" text type="success">La cantidad se ha modificado con éxito</v-alert>
    <v-alert v-if="error.cambiarCantidad" text type="error">No se ha podido modificar la cantidad</v-alert>
    <v-btn @click="cambiarCantidad" color="primary" dark block>Cambiar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Eliminar producto</div>
    <v-text-field v-model="eanProductoEliminado" placeholder="EAN" type="number" outlined></v-text-field>
    <v-alert v-if="success.eliminarProducto" text type="success">El producto se ha eliminado con éxito</v-alert>
    <v-alert v-if="error.eliminarProducto" text type="error">No se ha podido eliminar el producto</v-alert>
    <v-btn @click="eliminarProducto" color="primary" dark block>Eliminar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar un producto</div>
    <v-text-field v-model="eanProductoConsultado" placeholder="EAN" type="number" outlined></v-text-field>
    <v-btn @click="consultarProducto" color="primary" dark block>Consultar</v-btn>
    <v-alert v-if="error.consultarProducto" text type="error">No existe un producto con este EAN</v-alert>
    <v-list>
      <v-list-item v-for="(producto, i) in productos" :key="i" two-line>
        <v-list-item-title>{{producto.EAN_producto}} (Almacén {{producto.codigo_alm}})</v-list-item-title>
        <v-list-item-subtitle>{{producto.fabricante}} {{producto.nombre}} {{producto.estado_cant_afectada}}</v-list-item-subtitle>
        <v-list-item-action>{{producto.precio}}€ <i>{{producto.cantidad}} en stock</i></v-list-item-action>
      </v-list-item>
    </v-list>

  </div>
</template>

<script>
import axios from 'axios'
const url = `https://apeteporica.herokuapp.com`  

export default {
  data: () => ({
    eanProductoEliminado: null,
    eanProductoConsultado: null,
    nuevoProducto: {
      ean: "",
      nombre: "",
      fabricante: "",
      precio: null
    },
    cambioCantidad: {
      ean: null,
      cantidad: null,
      codigo_alm: null,
    },
    productos: null,


    success: {
      crearProducto: false,
      cambiarCantidad: false,
      eliminarProducto: false,
    },

    error: {
      crearProducto: false,
      cambiarCantidad: false,
      eliminarProducto: false,
      consultarProducto: false,
    }
  }),

  methods: {

    async crearProducto() {
      this.success.crearProducto = false
      this.error.crearProducto = false
      try {
        await axios.post(`${url}/api/producto`, this.nuevoProducto)
        this.success.crearProducto = true

      } catch (err) {
        this.error.crearProducto = true
      }

    },
    async cambiarCantidad() {
      this.success.cambiarCantidad = false
      this.error.cambiarCantidad = false
      console.log(this.cambioCantidad)
      try {
        await axios.put(`${url}/api/producto/${this.cambioCantidad.ean}`, this.cambioCantidad)
        this.success.cambiarCantidad = true

      } catch (err) {
        this.error.cambiarCantidad = true
      }

    },
    async eliminarProducto() {
      this.success.eliminarProducto = false
      this.error.eliminarProducto = false
      try {
        await axios.delete(`${url}/api/producto/${this.eanProductoEliminado}`)
        this.success.eliminarProducto = true

      } catch (err) {
        this.error.eliminarProducto = true
      }

    },
    async consultarProducto() {
      this.error.consultarProducto = false
      try {
        this.productos = (await axios.get(`${url}/api/producto/${this.eanProductoConsultado}`)).data

      } catch(err) {
        this.error.consultarProducto = true

      }

    },
  }
}
</script>