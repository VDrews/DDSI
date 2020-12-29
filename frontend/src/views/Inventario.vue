<template>
  <div id="inventario">
    <div class="display-1 font-weight-bold mt-6 mb-2">Crear un producto</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevoProducto.ean" placeholder="EAN" type="number" outlined></v-text-field>
      <v-text-field v-model="nuevoProducto.nombre" placeholder="Nombre" outlined></v-text-field>
      <v-text-field v-model="nuevoProducto.fabricante" placeholder="Fabricante" outlined></v-text-field>
      <v-text-field v-model="nuevoProducto.precio" placeholder="Precio" type="number" outlined suffix="€">></v-text-field>
    </div>
    <v-alert v-if="success.crearProducto" text type="success">El producto se ha creado con éxito</v-alert>
    <v-alert v-if="error.crearProducto" text type="error">Ya existe un producto con este EAN</v-alert>
    <v-btn @click="crearProducto" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Crear</v-btn>



    <div class="display-1 font-weight-bold mt-6 mb-2">Crear un almacén</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevoAlmacen.direccion" placeholder="Dirección" outlined></v-text-field>
    </div>
    <v-alert v-if="success.crearAlmacen" text type="success">El almacén se ha añadido con éxito</v-alert>
    <v-alert v-if="error.crearAlmacen" text type="error">No se ha podido añadir el almacén</v-alert>
   <v-btn @click="crearAlmacen" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Crear</v-btn>



    <div class="display-1 font-weight-bold mt-6 mb-2">Cambiar cantidad en almacén</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="cambioCantidad.ean" placeholder="EAN" type="number" outlined></v-text-field>
      <v-text-field v-model="cambioCantidad.cantidad" placeholder="Cantidad" type="number" outlined suffix="unidades">></v-text-field>
      <v-text-field v-model="cambioCantidad.codigo_alm" placeholder="Código de Almacen" type="number" outlined></v-text-field>
    </div>
    <v-alert v-if="success.cambiarCantidad" text type="success">La cantidad se ha modificado con éxito</v-alert>
    <v-alert v-if="error.cambiarCantidad" text type="error">No se ha podido modificar la cantidad</v-alert>
    <v-btn @click="cambiarCantidad" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Cambiar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Nuevo producto en almacén</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="nuevoCantidad.ean" placeholder="EAN" type="number" outlined></v-text-field>
      <v-text-field v-model="nuevoCantidad.cantidad" placeholder="Cantidad" type="number" outlined></v-text-field>
      <v-text-field v-model="nuevoCantidad.codigo_alm" placeholder="Código de Almacen" type="number" outlined></v-text-field>
    </div>
    <v-alert v-if="success.addCantidad" text type="success">La cantidad se ha modificado con éxito</v-alert>
    <v-alert v-if="error.addCantidad" text type="error">No se ha podido modificar la cantidad</v-alert>
    <v-btn @click="addCantidad" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Añadir</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Cambiar estado de producto</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="cambioEstado.ean" placeholder="EAN" type="number" outlined></v-text-field>
      <v-text-field v-model="cambioEstado.estado" placeholder="Estado" outlined></v-text-field>
      <v-text-field v-model="cambioEstado.cantidad" placeholder="Cantidad afectada" type="number" outlined></v-text-field>
      <v-text-field v-model="cambioEstado.codigo_alm" placeholder="Código de Almacen" type="number" outlined></v-text-field>
    </div>
    <v-alert v-if="success.cambiarEstado" text type="success">El estado se ha modificado con éxito</v-alert>
    <v-alert v-if="error.cambiarEstado" text type="error">No se ha podido modificar el estado</v-alert>
    <v-btn @click="cambiarEstado" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Cambiar</v-btn>

    <div class="display-1 font-wei:wq!ght-bold mt-6 mb-2">Eliminar producto</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="eanProductoEliminado" placeholder="EAN" type="number" outlined></v-text-field>
    </div>
    <v-alert v-if="success.eliminarProducto" text type="success">El producto se ha eliminado con éxito</v-alert>
    <v-alert v-if="error.eliminarProducto" text type="error">No se ha podido eliminar el producto</v-alert>
    <v-btn @click="eliminarProducto" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Eliminar</v-btn>

    <div class="display-1 font-weight-bold mt-6 mb-2">Consultar un producto</div>
    <div style="max-width: 900px; margin: 0 auto">
      <v-text-field v-model="eanProductoConsultado" placeholder="EAN" type="number" outlined></v-text-field>
    </div>
    <v-btn @click="consultarProducto" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Consultar</v-btn>
    <v-alert v-if="error.consultarProducto" text type="error">No existe un producto con este EAN</v-alert>
    <v-list>
      <v-list-item v-for="(producto, i) in productos" :key="i" two-line>
        <v-list-item-title>{{producto.EAN_producto}} (Almacén {{producto.codigo_alm}})</v-list-item-title>
        <v-list-item-subtitle>{{producto.fabricante}} {{producto.nombre}} {{producto.estado_cant_afectada}}</v-list-item-subtitle>
        <v-list-item-action>{{producto.precio}}€ <i>{{producto.cantidad}} en stock</i></v-list-item-action>
      </v-list-item>
    </v-list>

    <div class="display-1 font-weight-bold mt-6 mb-2">Eliminar inventario</div>
    <v-text-field v-model="eanProductoEliminado" placeholder="EAN" type="number" outlined></v-text-field>
    <v-text-field v-model="almacenProductoEliminado" placeholder="Cód. almacén" type="number" outlined></v-text-field>
    <v-alert v-if="success.eliminarInventario" text type="success">El producto se ha eliminado con éxito del almacén</v-alert>
    <v-alert v-if="error.eliminarInventario" text type="error">No se ha podido eliminar el producto</v-alert>
    <v-btn @click="eliminarInventario" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Eliminar</v-btn>

  </div>
</template>

<script>
import axios from 'axios'
const url = `https://apeteporica.herokuapp.com`

export default {
  data: () => ({
    eanProductoEliminado: null,
    eanProductoConsultado: null,
    almacenProductoEliminado: null,
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
    nuevoCantidad: {
      ean: null,
      cantidad: null,
      codigo_alm: null,
    },
    cambioEstado: {
      ean: null,
      cantidad: null,
      codigo_alm: null,
      estado: null,
    },
    nuevoAlmacen: {
      direccion: "",
    },
    productos: null,


    success: {
      crearProducto: false,
      crearAlmacen: false,
      cambiarCantidad: false,
      cambiarEstado: false,
      eliminarProducto: false,
      eliminarInventario: false,
      addCantidad: false,
    },

    error: {
      crearProducto: false,
      crearAlmacen: false,
      cambiarCantidad: false,
      cambiarEstado: false,
      eliminarProducto: false,
      consultarProducto: false,
      eliminarInventario: false,
      addCantidad: false,
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

      async crearAlmacen() {
      this.success.crearAlmacen = false
      this.error.crearAlmacen = false
      try {
        await axios.post(`${url}/api/almacen`, this.nuevoAlmacen)
        this.success.crearAlmacen = true

      } catch (err) {
        this.error.crearAlmacen = true
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

    async cambiarEstado() {
      this.success.cambiarEstado = false
      this.error.cambiarEstado = false
      console.log(this.cambioEstado)
      try {
        await axios.put(`${url}/api/producto/${this.cambioEstado.ean}/${this.cambioEstado.estado}`, this.cambioEstado)
        this.success.cambiarEstado = true

      } catch (err) {
        this.error.cambiarEstado = true
      }

    },
    async eliminarProducto() {
      this.success.eliminarProducto = false
      this.error.eliminarProducto = false
      console.log(this.eanProductoEliminado)
      try {
        await axios.delete(`${url}/api/producto/${this.eanProductoEliminado}`)
        this.success.eliminarProducto = true

      } catch (err) {
        this.error.eliminarProducto = true
      }

    },

    async eliminarInventario() {
      this.success.eliminarInventario = false
      this.error.eliminarInventario = false

      try {
        await axios.delete(`${url}/api/producto/${this.eanProductoEliminado}/${this.almacenProductoEliminado}`)
        this.success.eliminarInventario = true

      } catch (err) {
        this.error.eliminarInventario = true
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

    async addCantidad() {
      this.success.addCantidad = false
      this.error.addCantidad = false
      try {
        await axios.post(`${url}/api/producto/${this.nuevoCantidad.ean}`, this.addCantidad)
        this.success.addCantidad = true

      } catch (err) {
        this.error.addCantidad = true
      }

    },
  }
}
</script>