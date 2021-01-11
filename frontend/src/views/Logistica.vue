<template>
    <div id="logistica">
        <div class="display-1 font-weight-bold mt-6 mb-2"> Recibir producto (2.1) </div>
        <div style="max-width: 900px; margin: 0 auto">
            <v-text-field :rules="[field_not_empty]" v-model="RP_2_1.fabricante" placeholder="Fabricante" outlined required></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="RP_2_1.nombre_producto" placeholder="Nombre del producto" outlined></v-text-field>
            <v-text-field :rules="[precio_positivo]" v-model="RP_2_1.precio" placeholder="Precio" type="number" outlined suffix="€"></v-text-field>
            <v-text-field :rules="[unidades_positivas]" v-model="RP_2_1.cantidad" placeholder="Cantidad" type="number" outlined suffix="unidades"></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="RP_2_1.almacen" placeholder="Almacén en el que guardar" outlined></v-text-field>
        </div>
        <v-alert v-if="success.RP_2_1" text type="success" >El producto se ha creado con éxito</v-alert>
        <v-alert v-if="error.RP_2_1" text type="error">Ha ocurrido un error. Comprueba que los campos anteriores son correctos.</v-alert>
        <v-btn @click="RecibirProducto" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Añadir</v-btn>


        <div class="display-1 font-weight-bold mt-6 mb-2"> Enviar producto entre almacenes (2.2) </div>
        <div style="max-width: 900px; margin: 0 auto">
            <v-text-field :rules="[field_not_empty]" v-model="EPeA_2_2.almacen_partida" placeholder="Almacén de partida" outlined></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="EPeA_2_2.EAN" placeholder="EAN del producto" outlined></v-text-field>
            <v-text-field :rules="[unidades_positivas]" v-model="EPeA_2_2.cantidad" placeholder="Cantidad" type="number" outlined suffix="unidades">></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="EPeA_2_2.almacen_llegada" placeholder="Almacén de llegada" outlined></v-text-field>
        </div>
        <v-alert v-if="success.EPeA_2_2" text type="success">Se ha movido el inventario con éxito</v-alert>
        <v-alert v-if="error.EPeA_2_2" text type="error">Ha ocurrido un error. Comprueba que los campos anteriores son correctos.</v-alert>
        <v-btn @click="EnviarProductoEntreAlmacenes" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Enviar</v-btn>


        <div class="display-1 font-weight-bold mt-6 mb-2"> Elegir transportista (2.5) </div>
        <div style="max-width: 900px; margin: 0 auto">
            <v-text-field :rules="[field_not_empty]" v-model="ET_2_5.ID_paquete" placeholder="ID del paquete" outlined></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="ET_2_5.transportista" placeholder="Transportista" outlined></v-text-field>
        </div>

        <v-alert v-if="success.ET_2_5" text type="success">Se ha cambiado el transportista con éxito</v-alert>
        <v-alert v-if="error.ET_2_5" text type="error">Ha ocurrido un error. Comprueba que los campos anteriores son correctos.</v-alert>
        <v-btn @click="ElegirTrasnportista" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Actualizar transportista</v-btn>


        <div class="display-1 font-weight-bold mt-6 mb-2"> Comprar producto (2.6) </div>
        <div style="max-width: 900px; margin: 0 auto">
            <v-text-field :rules="[field_not_empty]" v-model="CP_2_6.cliente" placeholder="Cliente" outlined></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="CP_2_6.EAN" placeholder="EAN del producto" outlined></v-text-field>
            <v-text-field :rules="[unidades_positivas]" v-model="CP_2_6.cantidad" placeholder="Cantidad" type="number" outlined suffix="unidades">></v-text-field>
            <v-text-field :rules="[field_not_empty]" v-model="CP_2_6.transportista" placeholder="Transportista" outlined></v-text-field>
        </div>
        <v-alert v-if="success.CP_2_6" text type="success">El producto ha sido comprado</v-alert>
        <v-alert v-if="error.CP_2_6" text type="error">Ha ocurrido un error. Comprueba que los campos anteriores son correctos.</v-alert>
        <v-btn @click="ComprarProducto" color="secondary" dark x-large outlined :style="{left: '50%', transform:'translateX(-50%)'}">Comprar</v-btn>
    </div>
</template>

<script>
import axios from 'axios'
const url = `https://apeteporica.herokuapp.com`

export default {
    data: () => ({
        // Los nombres corresponden a los nombres de los métodos. Mirar los DIVs de template para mirar qué significan
        RP_2_1: {
            fabricante: "",
            nombre_producto: "",
            precio: null,
            cantidad: null,
            almacen: ""
        },
        EPeA_2_2: {
            almacen_partida: "",
            EAN: "",
            cantidad: null,
            almacen_llegada: ""
        },
        ET_2_5: {
            ID_paquete: "",
            transportista: ""
        },
        CP_2_6: {
            cliente: "",
            EAN: "",
            cantidad: null,
            transportista: ""
        },

        success: {
            RP_2_1: false,
            EPeA_2_2: false,
            ET_2_5: false,
            CP_2_6: false
        },

        error: {
            RP_2_1: false,
            EPeA_2_2: false,
            ET_2_5: false,
            CP_2_6: false
        },

        field_not_empty   : (str)   => (!!str) ? true  : "El campo no puede ser vacío",
        precio_positivo   : (value) => value > 0 ? true: "El precio debe ser positivo",
        unidades_positivas: (value) => value > 0 ? true: "El número de unidades debe ser positivo",
    }),

    methods: {
        async RecibirProducto() {
            this.success.RP_2_1 = false
            this.error.RP_2_1 = false

            try {
                await axios.post(`${url}/api/logistica/recibir`, this.RP_2_1)
                this.success.RP_2_1 = true
            } catch (err) {
                this.error.RP_2_1 = true
            }
        },

        async EnviarProductoEntreAlmacenes() {
            this.success.EPeA_2_2 = false
            this.error.EPeA_2_2 = false

            try {
                await axios.post(`${url}/api/logistica/almacenes`, this.EPeA_2_2)
                this.success.EPeA_2_2 = true
            } catch (err) {
                this.error.EPeA_2_2 = true
            }
        },

        async ElegirTrasnportista() {
            this.success.ET_2_5 = false
            this.error.ET_2_5 = false

            try {
                await axios.put(`${url}/api/logistica/${this.ET_2_5.ID_paquete}`, this.ET_2_5)
                this.success.ET_2_5 = true
            } catch (err) {
                this.error.ET_2_5 = true
            }
        },

        async ComprarProducto() {
            this.success.CP_2_6 = false
            this.error.CP_2_6 = false

            try {
                await axios.post(`${url}/api/logistica/compra`, this.CP_2_6)
                this.success.CP_2_6 = true
            } catch (err) {
                this.error.CP_2_6 = true
            }
        }
    }
}
</script>