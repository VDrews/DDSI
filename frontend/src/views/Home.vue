<template>
  <div class="home">
    <div class="display-2">Dashboard de Apetepórica</div>
    <v-layout wrap class="mt-8">
      <v-card class="pa-6 mr-3" hover @click="$router.push({ name: 'Contabilidad' })">
        <v-layout justify-center>
          <v-icon size="100" color="black">
            mdi-cash-multiple
          </v-icon>
        </v-layout>
        <v-card-title>Contabilidad</v-card-title>
      </v-card>
      <v-card class="pa-6 mr-3" hover @click="$router.push({ name: 'Inventario' })">
        <v-layout justify-center>
          <v-icon size="100" color="black">
            mdi-package-variant-closed
          </v-icon>
        </v-layout>
        <v-card-title>Inventario</v-card-title>
      </v-card>
      <v-card class="pa-6 mr-3" hover @click="$router.push({ name: 'Logistica' })">
        <v-layout justify-center>
          <v-icon size="100" color="black">
            mdi-truck
          </v-icon>
        </v-layout>
        <v-card-title>Logistica</v-card-title>
      </v-card>
      <v-card class="pa-6 mr-3" hover @click="$router.push({ name: 'Marketing' })">
        <v-layout justify-center>
          <v-icon size="100" color="black">
            mdi-label
          </v-icon>
        </v-layout>
        <v-card-title>Marketing</v-card-title>
      </v-card>
      <v-card class="pa-6 mr-3" hover @click="$router.push({ name: 'RRHH' })">
        <v-layout justify-center>
          <v-icon size="100" color="black">
            mdi-account-multiple
          </v-icon>
        </v-layout>
        <v-card-title>Recursos Humanos</v-card-title>
      </v-card>
    </v-layout>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
