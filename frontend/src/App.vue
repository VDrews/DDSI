<template>
  <v-app>

    <v-navigation-drawer app>
      <h1 class="ma-6" style="font-weight: 800; cursor: pointer;" @click="$router.push({path: '/'})">APETEPORICA</h1>
      <v-list-item @click="$router.push({ name: 'Contabilidad' })">
        <v-list-item-avatar>
          <v-icon> mdi-cash-multiple </v-icon>
        </v-list-item-avatar>
        <span>Contabilidad</span>
      </v-list-item>
      <v-list-item @click="$router.push({ name: 'Inventario' })">
        <v-list-item-avatar>
          <v-icon> mdi-package-variant-closed </v-icon>
        </v-list-item-avatar>
        <span>Inventario</span>
      </v-list-item>
      </v-list-item>
      <v-list-item @click="$router.push({ name: 'Logistica' })">
        <v-list-item-avatar>
          <v-icon> mdi-truck </v-icon>
        </v-list-item-avatar>
        <span>Logistica</span>
      </v-list-item>
      </v-list-item>
      <v-list-item @click="$router.push({ name: 'Marketing' })">
        <v-list-item-avatar>
          <v-icon> mdi-label </v-icon>
        </v-list-item-avatar>
        <span>Marketing</span>
      </v-list-item>
      </v-list-item>
      <v-list-item @click="$router.push({ name: 'RRHH' })">
        <v-list-item-avatar>
          <v-icon> mdi-account-multiple </v-icon>
        </v-list-item-avatar>
        <span>Recursos Humanos</span>
      </v-list-item>
      </v-list-item>
      
    </v-navigation-drawer>
    <v-main>
      <v-toolbar style="position: sticky; top: 0; z-index: 20" color="blue" dark flat>
        <v-btn v-if="$route.name != 'Home'" class="mx-1" icon dark @click="$router.push({path: '/'})">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <h2>{{$route.name}}</h2>
      </v-toolbar>
      <router-view class="ma-6"></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>
